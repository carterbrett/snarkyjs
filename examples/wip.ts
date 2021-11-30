import { CircuitValue, prop, PrivateKey, PublicKey, Signature, Field, AccumulatorMembershipProof, KeyedAccumulatorFactory, MerkleAccumulatorFactory, MerkleStack, Party, SmartContract, state, method, init, proofSystem, branch, ProofWithInput, Mina, Int } from '@o1labs/snarkyjs';

const AccountDbDepth: number = 32;
const AccountDb = KeyedAccumulatorFactory<PublicKey, RollupAccount>(AccountDbDepth);
type AccountDb = InstanceType<typeof AccountDb>;

class RollupAccount extends CircuitValue {
  @prop balance: Int.UInt64;
  @prop nonce: Int.UInt32;
  @prop publicKey: PublicKey;

  constructor(balance: Int.UInt64, nonce: Int.UInt32, publicKey: PublicKey) {
    super();
    this.balance = balance;
    this.nonce = nonce;
    this.publicKey = publicKey;
  }
}

class RollupTransaction extends CircuitValue {
  @prop amount: Int.UInt64;
  @prop nonce: Int.UInt32;
  @prop sender: PublicKey;
  @prop receiver: PublicKey;

  constructor(amount: Int.UInt64, nonce: Int.UInt32, sender: PublicKey, receiver: PublicKey) {
    super();
    this.amount = amount;
    this.nonce = nonce;
    this.sender = sender;
    this.receiver = receiver;
  }
}

class RollupDeposit extends CircuitValue {
  @prop publicKey: PublicKey;
  @prop amount: Int.UInt64;
  constructor(publicKey: PublicKey, amount: Int.UInt64) {
    super();
    this.publicKey = publicKey;
    this.amount = amount;
  }
}

class RollupState extends CircuitValue {
  @prop pendingDepositsCommitment: Field;
  @prop accountDbCommitment: Field;
  constructor(p: Field, c: Field) {
    super();
    this.pendingDepositsCommitment = p;
    this.accountDbCommitment = c;
  }
}

class RollupStateTransition extends CircuitValue {
  @prop source: RollupState;
  @prop target: RollupState;
  constructor(source: RollupState, target: RollupState) {
    super();
    this.source = source;
    this.target = target;
  }
}

// a recursive proof system is kind of like an "enum"

@proofSystem
class RollupProof extends ProofWithInput<RollupStateTransition> {
  @branch static processDeposit(
    pending: MerkleStack<RollupDeposit>,
    accountDb: AccountDb): RollupProof {
    let before = new RollupState(pending.commitment, accountDb.commitment());
    // let deposit = pending.pop();

    // TODO: Apply deposit to db

    let after = new RollupState(pending.commitment, accountDb.commitment());

    return new RollupProof(new RollupStateTransition(before, after));
  }

  @branch static transaction(
    t: RollupTransaction,
    s: Signature,
    pending: MerkleStack<RollupDeposit>,
    accountDb: AccountDb,
  ): RollupProof {
    s.verify(t.sender, t.toFieldElements()).assertEquals(true);
    let stateBefore = new RollupState(pending.commitment, accountDb.commitment());

    console.log('txn', 0);
    let [senderAccount, senderPos] = accountDb.get(t.sender);
    senderAccount.isSome.assertEquals(true);
    senderAccount.value.nonce.assertEquals(t.nonce);

    console.log('txn', 1);
    senderAccount.value.balance = senderAccount.value.balance.sub(t.amount);
    senderAccount.value.nonce = senderAccount.value.nonce.add(1);

    console.log('txn', 2);
    accountDb.set(senderPos, senderAccount.value);

    console.log('txn', 3);
    let [receiverAccount, receiverPos] = accountDb.get(t.receiver);
    receiverAccount.value.balance = receiverAccount.value.balance.add(t.amount);
    accountDb.set(receiverPos, receiverAccount.value);

    console.log('txn', 4);
    let stateAfter = new RollupState(pending.commitment, accountDb.commitment());
    return new RollupProof(new RollupStateTransition(stateBefore, stateAfter));
  }

  // Is branch a good name?
  @branch static merge(p1: RollupProof, p2: RollupProof): RollupProof {
    p1.publicInput.target.assertEquals(
      p2.publicInput.source
    );
    return new RollupProof(
      new RollupStateTransition(
        p1.publicInput.source,
        p2.publicInput.target));
  }
}

const OperatorsDbDepth: number = 8;
const OperatorsDb = MerkleAccumulatorFactory<PublicKey>(OperatorsDbDepth);
type OperatorsDb = InstanceType<typeof OperatorsDb>;

// Rollup proof system itself (executed off chain)

// Rollup snapp

/*
  There is a database of accounts that exists offchain ("hosted" on IPFS)
    - rollup state

  There is a database of permissioned rollup operator public keys, that's private
  and stored on the disk of the owner of this snapp account.

  - if you're the owner, you can add a permissioned operator to the set of operators
    - you can only do this every 20 slots
  - if you're a user, you can deposit funds into the rollup (in the future you can withdraw too)
  - if you're a rollup operator, you can post a rollup proof to the snapp account and thus
    update its state


    - init 
    - usage
    - methods
    - state
*/

/*
A snapp transaction is a list of permissioned, precondition, updates

- where a permission is a proof or a signature or nothing
- a precondition is a series of assertions about the current state on Mina
  - network preconditions (assertions on the protocol state)
  - account preconditions (specific to state in an account)
- an update is an edit to the on-chain state.
*/

/*
  
general stuff for defining types that can be used as private/public inputs
@prop

smart contract specific
@state
@method

A circuit is a function that whose inputs are divided into
public inputs and private inputs

A smart contract is basically 
- a description of the on-chain state used by that smart contract

  the @state decorator is used to list out the onchain state
- a list of circuits all of which have as their public input
  the same thing, which is essentially a snapp transaction
  
  - snapp transaction
    - pr
  
  the @method decorator is used to list out all these circuits

  and each individual circuit basically checks, "is this snapp
  transaction (i.e., the one currently being constructed) 
  acceptable to me"
*/


class RollupSnapp extends SmartContract {
  @state(Field) operatorsCommitment: Party.State<Field>; // state slot 0
  @state(RollupState) rollupState: Party.State<RollupState>; // state slots 1, 2
  // RollupState public rollupState;

  // The 5 slot period during which this was last updated
  @state(Int.UInt32) lastUpdatedPeriod: Party.State<Int.UInt32>; // state slot 3
  // Int.UInt32 public lastUpdatedPeriod

  // maybe try something like react state hooks?

  // the constructor should be init
  constructor(
    senderAmount: Int.UInt64,
    address: PublicKey,
    operatorsDb: OperatorsDb,
    accountDb: AccountDb,
    deposits: MerkleStack<RollupDeposit>,
    lastUpatedPeriod: Int.UInt32,
  ) {
    console.log('init', 0)
    super(address);
    console.log('sender amount', JSON.stringify(senderAmount));
    this.self.delta = Int.Int64.fromUnsigned(senderAmount);
    console.log('init', 1)
    console.log('should not be undefined', this.address);
    this.operatorsCommitment = Party.State.init(operatorsDb.commitment());
    console.log('init', 2)
    this.lastUpdatedPeriod = Party.State.init(lastUpatedPeriod);
    console.log('init', 3)
    this.rollupState = Party.State.init(new RollupState(deposits.commitment, accountDb.commitment()));
    console.log('init', 4)
  }

  static instanceOnChain(address: PublicKey): RollupSnapp { throw 'instanceonchain' }

  static periodLength = 5;
  static newOperatorGapSlots = 20;
  static newOperatorGapPeriods = RollupSnapp.newOperatorGapSlots / RollupSnapp.periodLength;

  @init init() {
    let perms = Party.Permissions.default();
    // Force users to use the deposit method to send to this account
    perms.receive = Party.Perm.proof();
    perms.editState = Party.Perm.proof();
    this.self.update.permissions.setValue(perms)
  }

  // Only allowed to update every so often
  @method addOperator(
    submittedSlot: Int.UInt32,
    operatorsDb: OperatorsDb,
    pk: PublicKey,
    s: Signature) {
    console.log('add', 0);
    let period = submittedSlot.div(RollupSnapp.periodLength);
    console.log('add', 1);
    let startSlot = period.mul(RollupSnapp.periodLength);
    console.log('add', 2);


    /*
    this.deferToOnChain((onChainState) => {
    })
    */


    /*
     *
     precondition.network({ protocolState } => {
       protocolState.globalSlotSinceGenesis.assertBetween(
         startSlot, startSlot.add(RollupSnapp.periodLength));
       )
     })
 
     this.self.precondition({ accountState } => {
 
     });
 
     */

    /*
    this.protocolState.globalSlotSinceGenesis.assertBetween(
      startSlot, startSlot.add(RollupSnapp.periodLength));
      */

    // Check it has been a while since the last addition of a new
    // operator
    /*
    period.assertGt(
      this.lastUpdatedPeriod.get()
      .add(RollupSnapp.newOperatorGapPeriods)
    );
    */
    console.log('add', 3);
    this.lastUpdatedPeriod.set(period);
    console.log('add', 4);

    this.operatorsCommitment.assertEquals(operatorsDb.commitment());
    console.log('add', 5);

    const self = this.self;
    console.log('add', 6);

    // verify signature on
    // message = [ submittedSlot, operatorPubKey ]
    let message = submittedSlot.toFieldElements().concat(pk.toFieldElements());
    console.log('add', 7);
    s.verify(self.publicKey, message).assertEquals(true);

    console.log('add', 8);
    operatorsDb.add(pk);
    console.log('add', 9);
    this.operatorsCommitment.set(operatorsDb.commitment());
    console.log('add', 10);
  }

  @method depositFunds(
    depositor: Party.Body,
    depositAmount: Int.UInt64) {
    const self = this.self;

    let delta = Party.SignedAmount.fromUnsigned(depositAmount);
    self.delta = delta;

    depositor.delta = delta.neg();

    let deposit = new RollupDeposit(depositor.publicKey, depositAmount);
    this.emitEvent(deposit);
    const rollupState = this.rollupState.get();

    /*
    rollupState.pendingDepositsCommitment = MerkleStack.pushCommitment(
      deposit, rollupState.pendingDepositsCommitment
    );
    this.rollupState.set(rollupState);
    */
  }

  @method updateRollupState(
    // TODO: Explicitly verify the proof
    rollupProof: RollupProof,
    operatorMembership: AccumulatorMembershipProof,
    // Operator signs the new rollup state
    operator: PublicKey,
    operatorSignature: Signature) {
    // What you can actually do with snapp state fields is
    // - assert that they have a given value
    // - set them to a new value

    /*
    operatorMembership.verify(this.operatorsCommitment.get(), operator)
    .assertEquals(true);

    operatorSignature.verify(operator, rollupProof.publicInput.target.toFieldElements())
    .assertEquals(true);

    // account precondition
    this.rollupState.assertEquals(rollupProof.publicInput.source);
    // account update
    this.rollupState.set(rollupProof.publicInput.target);
    */
  }
}

class SimpleSnapp extends SmartContract {
  @state(Field) value: Party.State<Field>;

  // Maybe have the address not passed in somehow
  // Maybe create account first and then deploy smart contract to it
  // On ethereum, you deploy them from a key-account and it's deterministically generated from the sender account
  constructor(initialBalance: Int.UInt64, address: PublicKey, x: Field) {
    super(address);
    this.self.delta = Int.Int64.fromUnsigned(initialBalance);
    this.value = Party.State.init(x);
  }

  // Maybe don't return a promise here, it's a bit confusing
  @method async update(y: Field) {
    const x = await this.value.get();
    console.log('assert equals');
    x.square().mul(x).assertEquals(y);
    console.log('past assert equals');
    this.value.set(y);
  }
}
// extend this with a 'prize' for updating the account

export async function main() {
  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  const largeValue = 30000000000;

  // Maybe just return deterministically 10 accounts with a bunch of money in them
  // Initialize an account so we can send some transactions
  const account1 = PrivateKey.random();
  Local.addAccount(account1.toPublicKey(), largeValue);
  const account2 = PrivateKey.random();
  Local.addAccount(account2.toPublicKey(), largeValue);

  const snappPrivkey = PrivateKey.random();
  const snappPubkey = snappPrivkey.toPublicKey();

  let snappInstance: SimpleSnapp;
  const initSnappState = new Field(2);

  // Deploys the snapp
  await Mina.transaction(account1, async () => {
    // account2 sends 1000000000 to the new snapp account
    const amount = Int.UInt64.fromNumber(1000000000);
    const p = await Party.Party.createSigned(account2);
    p.body.delta = Int.Int64.fromUnsigned(amount).neg();

    snappInstance = new SimpleSnapp(amount, snappPubkey, initSnappState);
  }).send().wait();

  // Update the snapp
  await Mina.transaction(account1, async () => {
    snappInstance.update(new Field(8))
  }).send().wait();

  await Mina.transaction(account1, async () => {
    snappInstance.update(new Field(109)).catch(e => console.log('error', e));
  }).send().wait()

  const a = await Mina.getAccount(snappPubkey);

  console.log('final state value', a.snapp.appState[0].toString());
}

/*
function mainold() {
  const minaSender = PrivateKey.random();
  const Local = Mina.Local();
  Mina.setActiveInstance(Local);
  const largeValue = 30000000000;
  Local.addAccount(minaSender.toPublicKey(), largeValue);

  // TODO: Put real value
  let snappOwnerKey = PrivateKey.random();
  let snappPubkey = snappOwnerKey.toPublicKey();
  console.log(0);

  let depositorPrivkey = PrivateKey.random();
  let depositorPubkey = depositorPrivkey.toPublicKey();
  console.log('depositorpubkey', depositorPubkey.toJSON());
  Local.addAccount(depositorPubkey, largeValue);

  console.log(1);
  const depth = 8;
  // Private state. Lives on disk.
  let operatorsDbStore = DataStore.InMemory<PublicKey>(
    PublicKey, depth);

  let operatorsDb = OperatorsDb.fromStore(operatorsDbStore);

  console.log(2);
  // Add a new rollup operator
  let newOperatorPrivkey = PrivateKey.random();
  let newOperatorPubkey = newOperatorPrivkey.toPublicKey();
  let currentSlot = Mina.currentSlot();
  let message = currentSlot.toFieldElements().concat(newOperatorPubkey.toFieldElements());
  let signature = Signature.create(snappOwnerKey, message);
  console.log(3);

  let accountKey = (a: RollupAccount) => a.publicKey;
  // Public state, the state of accounts on the rollup.
  let accountDbStore =
    DataStore.Keyed.InMemory(RollupAccount, PublicKey, accountKey, AccountDbDepth)
  let accountDb: AccountDb = AccountDb.create(
    accountKey,
    accountDbStore);

  let pendingDeposits = new MerkleStack<RollupDeposit>(RollupDeposit, () => []); // todo: storage

  let RollupInstance: RollupSnapp;

  console.log(4);

  // TODO: Have a mock Mina module for testing purposes
  // TODO: Make sure that modifications to data stores are not
  // committed before corresponding changes happen on chain

  // Executes a snapp method, broadcasts the transaction to chain.
  return Mina.getAccount(minaSender.toPublicKey()).then((a) => {
    console.log('sender account', JSON.stringify(a));
  })
  .then(() =>
  Mina.transaction(minaSender, () => {
    const amount = Int.UInt64.fromNumber(1000000000);

    return Party.createSigned(depositorPrivkey).then(p => {
      p.body.delta = Int.Int64.fromUnsigned(amount).neg();
      RollupInstance = new RollupSnapp(amount, snappPubkey, operatorsDb, accountDb, pendingDeposits, Int.UInt32.fromNumber(0));
    });
  }).send().wait())
  .then(() => {
    console.log('after init');
    return Mina.getAccount(snappPubkey).then((a) => {
      console.log('got account', JSON.stringify(a));
    }).catch((e) => { console.log('bad', e); throw e })
  })
  .then(() => {

    return Mina.transaction(minaSender, () => {
      console.log('main', 5);
      RollupInstance.addOperator(
        Mina.currentSlot(), operatorsDb, newOperatorPubkey, signature);
    }).send().wait().catch((e) => {console.log('fuc', e); throw e}).then(() => {
      console.log('main', 6);
      return Mina.transaction(minaSender, () => {
        return Party.createSigned(depositorPrivkey).then((depositor) => {
          // TODO: Figure out nicer way to have a second party.

          return Mina.getBalance(depositorPubkey).then((depositorBalance) => {
            // Deposit some funds into the rollup
            RollupInstance.depositFunds(depositor.body, depositorBalance.div(2));
          });
        });
      }).send().wait().catch((e) => {console.log('fuc', e); throw e})
    }).then(() => {
      console.log('main', 7);
      let rollupAmount = Int.UInt64.fromNumber(10);
      let rollupNonce = Int.UInt32.fromNumber(0);
      let rollupSender = depositorPubkey;
      let rollupReceiver = depositorPubkey;
      let rollupTransaction = new RollupTransaction(
        rollupAmount, rollupNonce, rollupSender, rollupReceiver
      );
      console.log('main', 8);

      const p1 =
          RollupProof.processDeposit(pendingDeposits, accountDb);
      console.log('main', 80);
      const p2 =
          RollupProof.transaction(
            rollupTransaction,
            Signature.create(depositorPrivkey, rollupTransaction.toFieldElements()),
            pendingDeposits,
            accountDb);

      console.log('main', 81);
      let rollupProof =
        RollupProof.merge(p1, p2);

      console.log('main', 9);
      return Mina.transaction(minaSender, () => {
      console.log('main', 10);
        let membershipProof = operatorsDb.getMembershipProof(newOperatorPubkey);
      console.log('main', 11);
        if (membershipProof === null) { throw 'not an operator' };
        RollupInstance.updateRollupState(
          rollupProof,
          membershipProof,
          newOperatorPubkey,
          Signature.create(
            newOperatorPrivkey,
            rollupProof.publicInput.target.toFieldElements())
        )
      }).send().wait().catch((e) => {
        console.log('rrr', e);
        throw e;
      });
    })

  });
}

*/