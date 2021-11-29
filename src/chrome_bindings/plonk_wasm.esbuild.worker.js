var __toBinary = /* @__PURE__ */ (() => {
  var table = new Uint8Array(128);
  for (var i = 0; i < 64; i++)
    table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
  return (base64) => {
    var n = base64.length, bytes = new Uint8Array((n - (base64[n - 1] == "=") - (base64[n - 2] == "=")) * 3 / 4 | 0);
    for (var i2 = 0, j = 0; i2 < n; ) {
      var c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
      var c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
      bytes[j++] = c0 << 2 | c1 >> 4;
      bytes[j++] = c1 << 4 | c2 >> 2;
      bytes[j++] = c2 << 6 | c3;
    }
    return bytes;
  };
})();

// src/chrome_bindings/snippets/wasm-bindgen-rayon-7afa899f36665473/src/workerHelpers.esbuild.js
function waitForMsgType(target, type) {
  return new Promise((resolve) => {
    target.addEventListener("message", function onMsg({ data }) {
      if (data == null || data.type !== type)
        return;
      target.removeEventListener("message", onMsg);
      resolve(data);
    });
  });
}
waitForMsgType(self, "wasm_bindgen_worker_init").then(async (data) => {
  await plonk_wasm_esbuild_default(data.module, data.memory);
  postMessage({ type: "wasm_bindgen_worker_ready" });
  wbg_rayon_start_worker(data.receiver);
});
var _workers;
async function startWorkers(module, memory, builder) {
  const workerInit = {
    type: "wasm_bindgen_worker_init",
    module,
    memory,
    receiver: builder.receiver(),
    mainJS: builder.mainJS()
  };
  _workers = await Promise.all(Array.from({ length: builder.numThreads() }, async () => {
    let scriptBlob = await fetch(CDN_LOCATION).then((r) => r.blob());
    let url = URL.createObjectURL(scriptBlob);
    const worker = new Worker(url, {
      type: "module"
    });
    worker.postMessage(workerInit);
    await waitForMsgType(worker, "wasm_bindgen_worker_ready");
    URL.revokeObjectURL(url);
    return worker;
  }));
  builder.build();
}

// src/chrome_bindings/plonk_wasm_bg.wasm

// src/chrome_bindings/plonk_wasm.esbuild.js
var CDN_LOCATION = "https://cdn.jsdelivr.net/gh/o1-labs/snarkyjs@feature/workshop-examples/src/chrome_bindings/plonk_wasm.esbuild.worker.js";
var wasm;
var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
var cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}
function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().slice(ptr, ptr + len));
}
var heap = new Array(32).fill(void 0);
heap.push(void 0, null, true, false);
var heap_next = heap.length;
function addHeapObject(obj) {
  if (heap_next === heap.length)
    heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
function getObject(idx) {
  return heap[idx];
}
function dropObject(idx) {
  if (idx < 36)
    return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
var cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}
function getArrayU8FromWasm0(ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
var WASM_VECTOR_LEN = 0;
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
  return instance.ptr;
}
function caml_pasta_fp_plonk_index_create(gates, public_, srs) {
  _assertClass(gates, WasmFpGateVector);
  _assertClass(srs, WasmFpSrs);
  var ret = wasm.caml_pasta_fp_plonk_index_create(gates.ptr, public_, srs.ptr);
  return WasmPastaFpPlonkIndex.__wrap(ret);
}
function caml_pasta_fp_plonk_index_max_degree(index) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ret = wasm.caml_pasta_fp_plonk_index_max_degree(index.ptr);
  return ret;
}
function caml_pasta_fp_plonk_index_public_inputs(index) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ret = wasm.caml_pasta_fp_plonk_index_public_inputs(index.ptr);
  return ret;
}
function caml_pasta_fp_plonk_index_domain_d1_size(index) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ret = wasm.caml_pasta_fp_plonk_index_domain_d1_size(index.ptr);
  return ret;
}
function caml_pasta_fp_plonk_index_domain_d4_size(index) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ret = wasm.caml_pasta_fp_plonk_index_domain_d4_size(index.ptr);
  return ret;
}
function caml_pasta_fp_plonk_index_domain_d8_size(index) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ret = wasm.caml_pasta_fp_plonk_index_domain_d8_size(index.ptr);
  return ret;
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
var cachedTextEncoder = new TextEncoder("utf-8");
var encodeString = function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length);
    getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len);
  const mem = getUint8Memory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127)
      break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function caml_pasta_fp_plonk_index_read(offset, srs, path) {
  _assertClass(srs, WasmFpSrs);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_plonk_index_read(!isLikeNone(offset), isLikeNone(offset) ? 0 : offset, srs.ptr, ptr0, len0);
  return WasmPastaFpPlonkIndex.__wrap(ret);
}
function caml_pasta_fp_plonk_index_write(append, index, path) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fp_plonk_index_write(isLikeNone(append) ? 16777215 : append ? 1 : 0, index.ptr, ptr0, len0);
}
var cachegetUint32Memory0 = null;
function getUint32Memory0() {
  if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint32Memory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachegetUint32Memory0;
}
function passArray32ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 4);
  getUint32Memory0().set(arg, ptr / 4);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function getArrayU32FromWasm0(ptr, len) {
  return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);
}
function caml_pasta_fp_plonk_proof_create(index, witness, prev_challenges, prev_sgs) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  _assertClass(witness, WasmVecVecFp);
  var ptr0 = witness.ptr;
  witness.ptr = 0;
  var ptr1 = passArray8ToWasm0(prev_challenges, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ptr2 = passArray32ToWasm0(prev_sgs, wasm.__wbindgen_malloc);
  var len2 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_plonk_proof_create(index.ptr, ptr0, ptr1, len1, ptr2, len2);
  return WasmFpProverProof.__wrap(ret);
}
function caml_pasta_fp_plonk_proof_verify(lgr_comm, index, proof) {
  var ptr0 = passArray32ToWasm0(lgr_comm, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  _assertClass(index, WasmFpPlonkVerifierIndex);
  var ptr1 = index.ptr;
  index.ptr = 0;
  _assertClass(proof, WasmFpProverProof);
  var ptr2 = proof.ptr;
  proof.ptr = 0;
  var ret = wasm.caml_pasta_fp_plonk_proof_verify(ptr0, len0, ptr1, ptr2);
  return ret !== 0;
}
function caml_pasta_fp_plonk_proofbatch_verify(lgr_comms, indexes, proofs) {
  _assertClass(lgr_comms, WasmVecVecFpPolyComm);
  var ptr0 = lgr_comms.ptr;
  lgr_comms.ptr = 0;
  var ptr1 = passArray32ToWasm0(indexes, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ptr2 = passArray32ToWasm0(proofs, wasm.__wbindgen_malloc);
  var len2 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_plonk_proofbatch_verify(ptr0, ptr1, len1, ptr2, len2);
  return ret !== 0;
}
function caml_pasta_fp_plonk_proof_dummy() {
  var ret = wasm.caml_pasta_fp_plonk_proof_dummy();
  return WasmFpProverProof.__wrap(ret);
}
function caml_pasta_fp_plonk_proof_deep_copy(x) {
  _assertClass(x, WasmFpProverProof);
  var ptr0 = x.ptr;
  x.ptr = 0;
  var ret = wasm.caml_pasta_fp_plonk_proof_deep_copy(ptr0);
  return WasmFpProverProof.__wrap(ret);
}
function caml_pasta_fq_plonk_proof_create(index, witness, prev_challenges, prev_sgs) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  _assertClass(witness, WasmVecVecFq);
  var ptr0 = witness.ptr;
  witness.ptr = 0;
  var ptr1 = passArray8ToWasm0(prev_challenges, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ptr2 = passArray32ToWasm0(prev_sgs, wasm.__wbindgen_malloc);
  var len2 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_plonk_proof_create(index.ptr, ptr0, ptr1, len1, ptr2, len2);
  return WasmFqProverProof.__wrap(ret);
}
function caml_pasta_fq_plonk_proof_verify(lgr_comm, index, proof) {
  var ptr0 = passArray32ToWasm0(lgr_comm, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  _assertClass(index, WasmFqPlonkVerifierIndex);
  var ptr1 = index.ptr;
  index.ptr = 0;
  _assertClass(proof, WasmFqProverProof);
  var ptr2 = proof.ptr;
  proof.ptr = 0;
  var ret = wasm.caml_pasta_fq_plonk_proof_verify(ptr0, len0, ptr1, ptr2);
  return ret !== 0;
}
function caml_pasta_fq_plonk_proofbatch_verify(lgr_comms, indexes, proofs) {
  _assertClass(lgr_comms, WasmVecVecFqPolyComm);
  var ptr0 = lgr_comms.ptr;
  lgr_comms.ptr = 0;
  var ptr1 = passArray32ToWasm0(indexes, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ptr2 = passArray32ToWasm0(proofs, wasm.__wbindgen_malloc);
  var len2 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_plonk_proofbatch_verify(ptr0, ptr1, len1, ptr2, len2);
  return ret !== 0;
}
function caml_pasta_fq_plonk_proof_dummy() {
  var ret = wasm.caml_pasta_fq_plonk_proof_dummy();
  return WasmFqProverProof.__wrap(ret);
}
function caml_pasta_fq_plonk_proof_deep_copy(x) {
  _assertClass(x, WasmFqProverProof);
  var ptr0 = x.ptr;
  x.ptr = 0;
  var ret = wasm.caml_pasta_fp_plonk_proof_deep_copy(ptr0);
  return WasmFqProverProof.__wrap(ret);
}
function caml_pasta_fp_plonk_verifier_index_read(offset, srs, path) {
  _assertClass(srs, WasmFpSrs);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_plonk_verifier_index_read(!isLikeNone(offset), isLikeNone(offset) ? 0 : offset, srs.ptr, ptr0, len0);
  return WasmFpPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fp_plonk_verifier_index_write(append, index, path) {
  _assertClass(index, WasmFpPlonkVerifierIndex);
  var ptr0 = index.ptr;
  index.ptr = 0;
  var ptr1 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len1 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fp_plonk_verifier_index_write(isLikeNone(append) ? 16777215 : append ? 1 : 0, ptr0, ptr1, len1);
}
function caml_pasta_fp_plonk_verifier_index_create(index) {
  _assertClass(index, WasmPastaFpPlonkIndex);
  var ret = wasm.caml_pasta_fp_plonk_verifier_index_create(index.ptr);
  return WasmFpPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fp_plonk_verifier_index_shifts(log2_size) {
  var ret = wasm.caml_pasta_fp_plonk_verifier_index_shifts(log2_size);
  return WasmFpShifts.__wrap(ret);
}
function caml_pasta_fp_plonk_verifier_index_dummy() {
  var ret = wasm.caml_pasta_fp_plonk_verifier_index_dummy();
  return WasmFpPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fp_plonk_verifier_index_deep_copy(x) {
  _assertClass(x, WasmFpPlonkVerifierIndex);
  var ret = wasm.caml_pasta_fp_plonk_verifier_index_deep_copy(x.ptr);
  return WasmFpPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fq_plonk_verifier_index_read(offset, srs, path) {
  _assertClass(srs, WasmFqSrs);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_plonk_verifier_index_read(!isLikeNone(offset), isLikeNone(offset) ? 0 : offset, srs.ptr, ptr0, len0);
  return WasmFqPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fq_plonk_verifier_index_write(append, index, path) {
  _assertClass(index, WasmFqPlonkVerifierIndex);
  var ptr0 = index.ptr;
  index.ptr = 0;
  var ptr1 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len1 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fq_plonk_verifier_index_write(isLikeNone(append) ? 16777215 : append ? 1 : 0, ptr0, ptr1, len1);
}
function caml_pasta_fq_plonk_verifier_index_create(index) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ret = wasm.caml_pasta_fq_plonk_verifier_index_create(index.ptr);
  return WasmFqPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fq_plonk_verifier_index_shifts(log2_size) {
  var ret = wasm.caml_pasta_fq_plonk_verifier_index_shifts(log2_size);
  return WasmFqShifts.__wrap(ret);
}
function caml_pasta_fq_plonk_verifier_index_dummy() {
  var ret = wasm.caml_pasta_fq_plonk_verifier_index_dummy();
  return WasmFqPlonkVerifierIndex.__wrap(ret);
}
function caml_pasta_fq_plonk_verifier_index_deep_copy(x) {
  _assertClass(x, WasmFqPlonkVerifierIndex);
  var ret = wasm.caml_pasta_fq_plonk_verifier_index_deep_copy(x.ptr);
  return WasmFqPlonkVerifierIndex.__wrap(ret);
}
function caml_fp_srs_create(depth) {
  var ret = wasm.caml_fp_srs_create(depth);
  return WasmFpSrs.__wrap(ret);
}
function caml_fp_srs_write(append, srs, path) {
  _assertClass(srs, WasmFpSrs);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_fp_srs_write(isLikeNone(append) ? 16777215 : append ? 1 : 0, srs.ptr, ptr0, len0);
}
function caml_fp_srs_read(offset, path) {
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_fp_srs_read(!isLikeNone(offset), isLikeNone(offset) ? 0 : offset, ptr0, len0);
  return ret === 0 ? void 0 : WasmFpSrs.__wrap(ret);
}
function caml_fp_srs_lagrange_commitment(srs, domain_size, i) {
  _assertClass(srs, WasmFpSrs);
  var ret = wasm.caml_fp_srs_lagrange_commitment(srs.ptr, domain_size, i);
  return WasmFpPolyComm.__wrap(ret);
}
function caml_fp_srs_commit_evaluations(srs, domain_size, evals) {
  _assertClass(srs, WasmFpSrs);
  var ptr0 = passArray8ToWasm0(evals, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_fp_srs_commit_evaluations(srs.ptr, domain_size, ptr0, len0);
  return WasmFpPolyComm.__wrap(ret);
}
function caml_fp_srs_b_poly_commitment(srs, chals) {
  _assertClass(srs, WasmFpSrs);
  var ptr0 = passArray8ToWasm0(chals, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_fp_srs_b_poly_commitment(srs.ptr, ptr0, len0);
  return WasmFpPolyComm.__wrap(ret);
}
function caml_fp_srs_batch_accumulator_check(srs, comms, chals) {
  _assertClass(srs, WasmFpSrs);
  var ptr0 = passArray32ToWasm0(comms, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(chals, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_fp_srs_batch_accumulator_check(srs.ptr, ptr0, len0, ptr1, len1);
  return ret !== 0;
}
function caml_fp_srs_h(srs) {
  _assertClass(srs, WasmFpSrs);
  var ret = wasm.caml_fp_srs_h(srs.ptr);
  return WasmGVesta.__wrap(ret);
}
function caml_fq_srs_create(depth) {
  var ret = wasm.caml_fq_srs_create(depth);
  return WasmFqSrs.__wrap(ret);
}
function caml_fq_srs_write(append, srs, path) {
  _assertClass(srs, WasmFqSrs);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_fp_srs_write(isLikeNone(append) ? 16777215 : append ? 1 : 0, srs.ptr, ptr0, len0);
}
function caml_fq_srs_read(offset, path) {
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_fp_srs_read(!isLikeNone(offset), isLikeNone(offset) ? 0 : offset, ptr0, len0);
  return ret === 0 ? void 0 : WasmFqSrs.__wrap(ret);
}
function caml_fq_srs_lagrange_commitment(srs, domain_size, i) {
  _assertClass(srs, WasmFqSrs);
  var ret = wasm.caml_fq_srs_lagrange_commitment(srs.ptr, domain_size, i);
  return WasmFqPolyComm.__wrap(ret);
}
function caml_fq_srs_commit_evaluations(srs, domain_size, evals) {
  _assertClass(srs, WasmFqSrs);
  var ptr0 = passArray8ToWasm0(evals, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_fq_srs_commit_evaluations(srs.ptr, domain_size, ptr0, len0);
  return WasmFqPolyComm.__wrap(ret);
}
function caml_fq_srs_b_poly_commitment(srs, chals) {
  _assertClass(srs, WasmFqSrs);
  var ptr0 = passArray8ToWasm0(chals, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_fq_srs_b_poly_commitment(srs.ptr, ptr0, len0);
  return WasmFqPolyComm.__wrap(ret);
}
function caml_fq_srs_batch_accumulator_check(srs, comms, chals) {
  _assertClass(srs, WasmFqSrs);
  var ptr0 = passArray32ToWasm0(comms, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(chals, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_fq_srs_batch_accumulator_check(srs.ptr, ptr0, len0, ptr1, len1);
  return ret !== 0;
}
function caml_fq_srs_h(srs) {
  _assertClass(srs, WasmFqSrs);
  var ret = wasm.caml_fp_srs_h(srs.ptr);
  return WasmGPallas.__wrap(ret);
}
function fp_oracles_create(lgr_comm, index, proof) {
  var ptr0 = passArray32ToWasm0(lgr_comm, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  _assertClass(index, WasmFpPlonkVerifierIndex);
  var ptr1 = index.ptr;
  index.ptr = 0;
  _assertClass(proof, WasmFpProverProof);
  var ptr2 = proof.ptr;
  proof.ptr = 0;
  var ret = wasm.fp_oracles_create(ptr0, len0, ptr1, ptr2);
  return WasmFpOracles.__wrap(ret);
}
function fp_oracles_dummy() {
  var ret = wasm.fp_oracles_dummy();
  return WasmFpOracles.__wrap(ret);
}
function fp_oracles_deep_copy(x) {
  _assertClass(x, WasmFpProverProof);
  var ptr0 = x.ptr;
  x.ptr = 0;
  var ret = wasm.fp_oracles_deep_copy(ptr0);
  return WasmFpProverProof.__wrap(ret);
}
function fq_oracles_create(lgr_comm, index, proof) {
  var ptr0 = passArray32ToWasm0(lgr_comm, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  _assertClass(index, WasmFqPlonkVerifierIndex);
  var ptr1 = index.ptr;
  index.ptr = 0;
  _assertClass(proof, WasmFqProverProof);
  var ptr2 = proof.ptr;
  proof.ptr = 0;
  var ret = wasm.fq_oracles_create(ptr0, len0, ptr1, ptr2);
  return WasmFqOracles.__wrap(ret);
}
function fq_oracles_dummy() {
  var ret = wasm.fq_oracles_dummy();
  return WasmFqOracles.__wrap(ret);
}
function fq_oracles_deep_copy(x) {
  _assertClass(x, WasmFqProverProof);
  var ptr0 = x.ptr;
  x.ptr = 0;
  var ret = wasm.fp_oracles_deep_copy(ptr0);
  return WasmFqProverProof.__wrap(ret);
}
function caml_bigint_256_of_numeral(s, _len, base) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_of_numeral(retptr, ptr0, len0, _len, base);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_bigint_256_of_decimal_string(s) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_of_decimal_string(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_bigint_256_num_limbs() {
  var ret = wasm.caml_bigint_256_num_limbs();
  return ret;
}
function caml_bigint_256_bytes_per_limb() {
  var ret = wasm.caml_bigint_256_bytes_per_limb();
  return ret;
}
function caml_bigint_256_div(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_div(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_bigint_256_compare(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_bigint_256_compare(ptr0, len0, ptr1, len1);
  return ret;
}
function caml_bigint_256_print(x) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_bigint_256_print(ptr0, len0);
}
function caml_bigint_256_to_string(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_to_string(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}
function caml_bigint_256_test_bit(x, i) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_bigint_256_test_bit(ptr0, len0, i);
  return ret !== 0;
}
function caml_bigint_256_to_bytes(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_to_bytes(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_bigint_256_of_bytes(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_of_bytes(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_bigint_256_deep_copy(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_bigint_256_deep_copy(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_plonk_gate_vector_create() {
  var ret = wasm.caml_pasta_fp_plonk_gate_vector_create();
  return WasmFpGateVector.__wrap(ret);
}
function caml_pasta_fp_plonk_gate_vector_add(v, gate) {
  _assertClass(v, WasmFpGateVector);
  _assertClass(gate, WasmFpGate);
  var ptr0 = gate.ptr;
  gate.ptr = 0;
  wasm.caml_pasta_fp_plonk_gate_vector_add(v.ptr, ptr0);
}
function caml_pasta_fp_plonk_gate_vector_get(v, i) {
  _assertClass(v, WasmFpGateVector);
  var ret = wasm.caml_pasta_fp_plonk_gate_vector_get(v.ptr, i);
  return WasmFpGate.__wrap(ret);
}
function caml_pasta_fp_plonk_gate_vector_wrap(v, t, h) {
  _assertClass(v, WasmFpGateVector);
  _assertClass(t, Wire);
  var ptr0 = t.ptr;
  t.ptr = 0;
  _assertClass(h, Wire);
  var ptr1 = h.ptr;
  h.ptr = 0;
  wasm.caml_pasta_fp_plonk_gate_vector_wrap(v.ptr, ptr0, ptr1);
}
function caml_pasta_fq_plonk_gate_vector_create() {
  var ret = wasm.caml_pasta_fp_plonk_gate_vector_create();
  return WasmFqGateVector.__wrap(ret);
}
function caml_pasta_fq_plonk_gate_vector_add(v, gate) {
  _assertClass(v, WasmFqGateVector);
  _assertClass(gate, WasmFqGate);
  var ptr0 = gate.ptr;
  gate.ptr = 0;
  wasm.caml_pasta_fq_plonk_gate_vector_add(v.ptr, ptr0);
}
function caml_pasta_fq_plonk_gate_vector_get(v, i) {
  _assertClass(v, WasmFqGateVector);
  var ret = wasm.caml_pasta_fq_plonk_gate_vector_get(v.ptr, i);
  return WasmFqGate.__wrap(ret);
}
function caml_pasta_fq_plonk_gate_vector_wrap(v, t, h) {
  _assertClass(v, WasmFqGateVector);
  _assertClass(t, Wire);
  var ptr0 = t.ptr;
  t.ptr = 0;
  _assertClass(h, Wire);
  var ptr1 = h.ptr;
  h.ptr = 0;
  wasm.caml_pasta_fq_plonk_gate_vector_wrap(v.ptr, ptr0, ptr1);
}
function caml_vesta_one() {
  var ret = wasm.caml_vesta_one();
  return WasmVestaGProjective.__wrap(ret);
}
function caml_vesta_add(x, y) {
  _assertClass(x, WasmVestaGProjective);
  _assertClass(y, WasmVestaGProjective);
  var ret = wasm.caml_vesta_add(x.ptr, y.ptr);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_vesta_sub(x, y) {
  _assertClass(x, WasmVestaGProjective);
  _assertClass(y, WasmVestaGProjective);
  var ret = wasm.caml_vesta_sub(x.ptr, y.ptr);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_vesta_negate(x) {
  _assertClass(x, WasmVestaGProjective);
  var ret = wasm.caml_vesta_negate(x.ptr);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_vesta_double(x) {
  _assertClass(x, WasmVestaGProjective);
  var ret = wasm.caml_vesta_double(x.ptr);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_vesta_scale(x, y) {
  _assertClass(x, WasmVestaGProjective);
  var ptr0 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_vesta_scale(x.ptr, ptr0, len0);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_vesta_random() {
  var ret = wasm.caml_vesta_random();
  return WasmVestaGProjective.__wrap(ret);
}
function caml_vesta_rng(i) {
  var ret = wasm.caml_vesta_rng(i);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_vesta_endo_base() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_vesta_endo_base(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_vesta_endo_scalar() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_vesta_endo_scalar(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_vesta_to_affine(x) {
  _assertClass(x, WasmVestaGProjective);
  var ret = wasm.caml_vesta_to_affine(x.ptr);
  return WasmGVesta.__wrap(ret);
}
function caml_vesta_of_affine(x) {
  _assertClass(x, WasmGVesta);
  var ptr0 = x.ptr;
  x.ptr = 0;
  var ret = wasm.caml_vesta_of_affine(ptr0);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_vesta_of_affine_coordinates(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_vesta_of_affine_coordinates(ptr0, len0, ptr1, len1);
  return WasmVestaGProjective.__wrap(ret);
}
function caml_vesta_affine_deep_copy(x) {
  _assertClass(x, WasmGVesta);
  var ptr0 = x.ptr;
  x.ptr = 0;
  var ret = wasm.caml_vesta_affine_deep_copy(ptr0);
  return WasmGVesta.__wrap(ret);
}
function greet(name) {
  var ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.greet(ptr0, len0);
}
function console_log(s) {
  var ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.console_log(ptr0, len0);
}
function create_zero_u32_ptr() {
  var ret = wasm.create_zero_u32_ptr();
  return ret;
}
function free_u32_ptr(ptr) {
  wasm.free_u32_ptr(ptr);
}
function set_u32_ptr(ptr, arg) {
  wasm.set_u32_ptr(ptr, arg);
}
function wait_until_non_zero(ptr) {
  var ret = wasm.wait_until_non_zero(ptr);
  return ret >>> 0;
}
function caml_pallas_one() {
  var ret = wasm.caml_pallas_one();
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pallas_add(x, y) {
  _assertClass(x, WasmPallasGProjective);
  _assertClass(y, WasmPallasGProjective);
  var ret = wasm.caml_pallas_add(x.ptr, y.ptr);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pallas_sub(x, y) {
  _assertClass(x, WasmPallasGProjective);
  _assertClass(y, WasmPallasGProjective);
  var ret = wasm.caml_pallas_sub(x.ptr, y.ptr);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pallas_negate(x) {
  _assertClass(x, WasmPallasGProjective);
  var ret = wasm.caml_pallas_negate(x.ptr);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pallas_double(x) {
  _assertClass(x, WasmPallasGProjective);
  var ret = wasm.caml_pallas_double(x.ptr);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pallas_scale(x, y) {
  _assertClass(x, WasmPallasGProjective);
  var ptr0 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pallas_scale(x.ptr, ptr0, len0);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pallas_random() {
  var ret = wasm.caml_pallas_random();
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pallas_rng(i) {
  var ret = wasm.caml_pallas_rng(i);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pallas_endo_base() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pallas_endo_base(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pallas_endo_scalar() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pallas_endo_scalar(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pallas_to_affine(x) {
  _assertClass(x, WasmPallasGProjective);
  var ret = wasm.caml_pallas_to_affine(x.ptr);
  return WasmGPallas.__wrap(ret);
}
function caml_pallas_of_affine(x) {
  _assertClass(x, WasmGPallas);
  var ptr0 = x.ptr;
  x.ptr = 0;
  var ret = wasm.caml_pallas_of_affine(ptr0);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pallas_of_affine_coordinates(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pallas_of_affine_coordinates(ptr0, len0, ptr1, len1);
  return WasmPallasGProjective.__wrap(ret);
}
function caml_pallas_affine_deep_copy(x) {
  _assertClass(x, WasmGPallas);
  var ptr0 = x.ptr;
  x.ptr = 0;
  var ret = wasm.caml_pallas_affine_deep_copy(ptr0);
  return WasmGPallas.__wrap(ret);
}
function caml_pasta_fq_plonk_index_create(gates, public_, srs) {
  _assertClass(gates, WasmFqGateVector);
  _assertClass(srs, WasmFqSrs);
  var ret = wasm.caml_pasta_fq_plonk_index_create(gates.ptr, public_, srs.ptr);
  return WasmPastaFqPlonkIndex.__wrap(ret);
}
function caml_pasta_fq_plonk_index_max_degree(index) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ret = wasm.caml_pasta_fq_plonk_index_max_degree(index.ptr);
  return ret;
}
function caml_pasta_fq_plonk_index_public_inputs(index) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ret = wasm.caml_pasta_fq_plonk_index_public_inputs(index.ptr);
  return ret;
}
function caml_pasta_fq_plonk_index_domain_d1_size(index) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ret = wasm.caml_pasta_fq_plonk_index_domain_d1_size(index.ptr);
  return ret;
}
function caml_pasta_fq_plonk_index_domain_d4_size(index) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ret = wasm.caml_pasta_fq_plonk_index_domain_d4_size(index.ptr);
  return ret;
}
function caml_pasta_fq_plonk_index_domain_d8_size(index) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ret = wasm.caml_pasta_fq_plonk_index_domain_d8_size(index.ptr);
  return ret;
}
function caml_pasta_fq_plonk_index_read(offset, srs, path) {
  _assertClass(srs, WasmFqSrs);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_plonk_index_read(!isLikeNone(offset), isLikeNone(offset) ? 0 : offset, srs.ptr, ptr0, len0);
  return WasmPastaFqPlonkIndex.__wrap(ret);
}
function caml_pasta_fq_plonk_index_write(append, index, path) {
  _assertClass(index, WasmPastaFqPlonkIndex);
  var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fq_plonk_index_write(isLikeNone(append) ? 16777215 : append ? 1 : 0, index.ptr, ptr0, len0);
}
function caml_pasta_fp_size_in_bits() {
  var ret = wasm.caml_pasta_fp_size_in_bits();
  return ret;
}
function caml_pasta_fp_size() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fp_size(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_add(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_add(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_sub(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_sub(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_negate(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_negate(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_mul(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_mul(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_div(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_div(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_inv(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_inv(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    let v1;
    if (r0 !== 0) {
      v1 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
    }
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_square(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_square(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_is_square(x) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_is_square(ptr0, len0);
  return ret !== 0;
}
function caml_pasta_fp_sqrt(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_sqrt(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    let v1;
    if (r0 !== 0) {
      v1 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
    }
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_of_int(i) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fp_of_int(retptr, i);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_to_string(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_to_string(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}
function caml_pasta_fp_of_string(s) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_of_string(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_print(x) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fp_print(ptr0, len0);
}
function caml_pasta_fp_compare(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_compare(ptr0, len0, ptr1, len1);
  return ret;
}
function caml_pasta_fp_equal(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fp_equal(ptr0, len0, ptr1, len1);
  return ret !== 0;
}
function caml_pasta_fp_random() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fp_random(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_rng(i) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fp_rng(retptr, i);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_to_bigint(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_to_bigint(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_of_bigint(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_of_bigint(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_two_adic_root_of_unity() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fp_two_adic_root_of_unity(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_domain_generator(log2_size) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fp_domain_generator(retptr, log2_size);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_to_bytes(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_to_bytes(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_of_bytes(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_of_bytes(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fp_deep_copy(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fp_deep_copy(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_size_in_bits() {
  var ret = wasm.caml_pasta_fp_size_in_bits();
  return ret;
}
function caml_pasta_fq_size() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fq_size(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_add(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_add(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_sub(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_sub(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_negate(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_negate(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_mul(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_mul(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_div(x, y) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_div(retptr, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_inv(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_inv(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    let v1;
    if (r0 !== 0) {
      v1 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
    }
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_square(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_square(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_is_square(x) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_is_square(ptr0, len0);
  return ret !== 0;
}
function caml_pasta_fq_sqrt(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_sqrt(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    let v1;
    if (r0 !== 0) {
      v1 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
    }
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_of_int(i) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fq_of_int(retptr, i);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_to_string(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_to_string(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}
function caml_pasta_fq_of_string(s) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_of_string(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_print(x) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.caml_pasta_fq_print(ptr0, len0);
}
function caml_pasta_fq_compare(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_compare(ptr0, len0, ptr1, len1);
  return ret;
}
function caml_pasta_fq_equal(x, y) {
  var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passArray8ToWasm0(y, wasm.__wbindgen_malloc);
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.caml_pasta_fq_equal(ptr0, len0, ptr1, len1);
  return ret !== 0;
}
function caml_pasta_fq_random() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fq_random(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_rng(i) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fq_rng(retptr, i);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_to_bigint(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_to_bigint(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_of_bigint(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_of_bigint(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_two_adic_root_of_unity() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fq_two_adic_root_of_unity(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_domain_generator(log2_size) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.caml_pasta_fq_domain_generator(retptr, log2_size);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_to_bytes(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_to_bytes(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_of_bytes(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_of_bytes(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function caml_pasta_fq_deep_copy(x) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.caml_pasta_fq_deep_copy(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}
function initThreadPool(num_threads) {
  var ret = wasm.initThreadPool(num_threads);
  return takeObject(ret);
}
function wbg_rayon_start_worker(receiver) {
  wasm.wbg_rayon_start_worker(receiver);
}
var WasmColumnTag = Object.freeze({ Witness: 0, "0": "Witness", Z: 1, "1": "Z", LookupSorted: 2, "2": "LookupSorted", LookupAggreg: 3, "3": "LookupAggreg", LookupTable: 4, "4": "LookupTable", LookupKindIndex: 5, "5": "LookupKindIndex", Index: 6, "6": "Index", Coefficient: 7, "7": "Coefficient" });
var CurrOrNext = Object.freeze({ Curr: 0, "0": "Curr", Next: 1, "1": "Next" });
var GateType = Object.freeze({
  Zero: 0,
  "0": "Zero",
  Generic: 1,
  "1": "Generic",
  Poseidon: 2,
  "2": "Poseidon",
  CompleteAdd: 3,
  "3": "CompleteAdd",
  Vbmul: 4,
  "4": "Vbmul",
  Endomul: 5,
  "5": "Endomul",
  EndomulScalar: 6,
  "6": "EndomulScalar",
  ChaCha0: 7,
  "7": "ChaCha0",
  ChaCha1: 8,
  "8": "ChaCha1",
  ChaCha2: 9,
  "9": "ChaCha2",
  ChaChaFinal: 10,
  "10": "ChaChaFinal"
});
var WasmColumn = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmColumn.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmcolumn_free(ptr);
  }
  get tag() {
    var ret = wasm.__wbg_get_wasmcolumn_tag(this.ptr);
    return ret >>> 0;
  }
  set tag(arg0) {
    wasm.__wbg_set_wasmcolumn_tag(this.ptr, arg0);
  }
  get gate_type() {
    var ret = wasm.__wbg_get_wasmcolumn_gate_type(this.ptr);
    return ret >>> 0;
  }
  set gate_type(arg0) {
    wasm.__wbg_set_wasmcolumn_gate_type(this.ptr, arg0);
  }
  get i() {
    var ret = wasm.__wbg_get_wasmcolumn_i(this.ptr);
    return ret;
  }
  set i(arg0) {
    wasm.__wbg_set_wasmcolumn_i(this.ptr, arg0);
  }
};
var WasmFpDomain = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpDomain.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfpdomain_free(ptr);
  }
  get log_size_of_group() {
    var ret = wasm.__wbg_get_wasmfpdomain_log_size_of_group(this.ptr);
    return ret;
  }
  set log_size_of_group(arg0) {
    wasm.__wbg_set_wasmfpdomain_log_size_of_group(this.ptr, arg0);
  }
  get group_gen() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfpdomain_group_gen(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set group_gen(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfpdomain_group_gen(this.ptr, ptr0, len0);
  }
  constructor(log_size_of_group, group_gen) {
    var ptr0 = passArray8ToWasm0(group_gen, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.wasmfpdomain_new(log_size_of_group, ptr0, len0);
    return WasmFpDomain.__wrap(ret);
  }
};
var WasmFpGate = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpGate.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfpgate_free(ptr);
  }
  get row() {
    var ret = wasm.__wbg_get_wasmfpgate_row(this.ptr);
    return ret >>> 0;
  }
  set row(arg0) {
    wasm.__wbg_set_wasmfpgate_row(this.ptr, arg0);
  }
  get typ() {
    var ret = wasm.__wbg_get_wasmfpgate_typ(this.ptr);
    return ret >>> 0;
  }
  set typ(arg0) {
    wasm.__wbg_set_wasmfpgate_typ(this.ptr, arg0);
  }
  get wires() {
    var ret = wasm.__wbg_get_wasmfpgate_wires(this.ptr);
    return WasmGateWires.__wrap(ret);
  }
  set wires(arg0) {
    _assertClass(arg0, WasmGateWires);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmfpgate_wires(this.ptr, ptr0);
  }
  constructor(row, typ, wires, c) {
    _assertClass(wires, WasmGateWires);
    var ptr0 = wires.ptr;
    wires.ptr = 0;
    var ptr1 = passArray8ToWasm0(c, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.wasmfpgate_new(row, typ, ptr0, ptr1, len1);
    return WasmFpGate.__wrap(ret);
  }
};
var WasmFpGateVector = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpGateVector.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfpgatevector_free(ptr);
  }
};
var WasmFpLinearization = class {
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfplinearization_free(ptr);
  }
};
var WasmFpOpeningProof = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpOpeningProof.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfpopeningproof_free(ptr);
  }
  get z1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfpopeningproof_z1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set z1(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfpopeningproof_z1(this.ptr, ptr0, len0);
  }
  get z2() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfpopeningproof_z2(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set z2(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfpopeningproof_z2(this.ptr, ptr0, len0);
  }
  constructor(lr_0, lr_1, delta, z1, z2, sg) {
    var ptr0 = passArray32ToWasm0(lr_0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray32ToWasm0(lr_1, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    _assertClass(delta, WasmGVesta);
    var ptr2 = delta.ptr;
    delta.ptr = 0;
    var ptr3 = passArray8ToWasm0(z1, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(z2, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    _assertClass(sg, WasmGVesta);
    var ptr5 = sg.ptr;
    sg.ptr = 0;
    var ret = wasm.wasmfpopeningproof_new(ptr0, len0, ptr1, len1, ptr2, ptr3, len3, ptr4, len4, ptr5);
    return WasmFpOpeningProof.__wrap(ret);
  }
  get lr_0() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfpopeningproof_lr_0(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get lr_1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfpopeningproof_lr_1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get delta() {
    var ret = wasm.wasmfpopeningproof_delta(this.ptr);
    return WasmGVesta.__wrap(ret);
  }
  get sg() {
    var ret = wasm.wasmfpopeningproof_sg(this.ptr);
    return WasmGVesta.__wrap(ret);
  }
  set lr_0(lr_0) {
    var ptr0 = passArray32ToWasm0(lr_0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfpopeningproof_set_lr_0(this.ptr, ptr0, len0);
  }
  set lr_1(lr_1) {
    var ptr0 = passArray32ToWasm0(lr_1, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfpopeningproof_set_lr_1(this.ptr, ptr0, len0);
  }
  set delta(delta) {
    _assertClass(delta, WasmGVesta);
    var ptr0 = delta.ptr;
    delta.ptr = 0;
    wasm.wasmfpopeningproof_set_delta(this.ptr, ptr0);
  }
  set sg(sg) {
    _assertClass(sg, WasmGVesta);
    var ptr0 = sg.ptr;
    sg.ptr = 0;
    wasm.wasmfpopeningproof_set_sg(this.ptr, ptr0);
  }
};
var WasmFpOracles = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpOracles.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfporacles_free(ptr);
  }
  get o() {
    var ret = wasm.__wbg_get_wasmfporacles_o(this.ptr);
    return WasmFpRandomOracles.__wrap(ret);
  }
  set o(arg0) {
    _assertClass(arg0, WasmFpRandomOracles);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmfporacles_o(this.ptr, ptr0);
  }
  get p_eval0() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfporacles_p_eval0(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set p_eval0(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfporacles_p_eval0(this.ptr, ptr0, len0);
  }
  get p_eval1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfporacles_p_eval1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set p_eval1(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfporacles_p_eval1(this.ptr, ptr0, len0);
  }
  get digest_before_evaluations() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfporacles_digest_before_evaluations(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set digest_before_evaluations(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfporacles_digest_before_evaluations(this.ptr, ptr0, len0);
  }
  constructor(o, p_eval0, p_eval1, opening_prechallenges, digest_before_evaluations) {
    _assertClass(o, WasmFpRandomOracles);
    var ptr0 = o.ptr;
    o.ptr = 0;
    var ptr1 = passArray8ToWasm0(p_eval0, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passArray8ToWasm0(p_eval1, wasm.__wbindgen_malloc);
    var len2 = WASM_VECTOR_LEN;
    var ptr3 = passArray8ToWasm0(opening_prechallenges, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(digest_before_evaluations, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    var ret = wasm.wasmfporacles_new(ptr0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
    return WasmFpOracles.__wrap(ret);
  }
};
var WasmFpPlonkVerificationEvals = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpPlonkVerificationEvals.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfpplonkverificationevals_free(ptr);
  }
  constructor(sigma_comm, coefficients_comm, generic_comm, psm_comm, complete_add_comm, mul_comm, emul_comm, endomul_scalar_comm) {
    var ptr0 = passArray32ToWasm0(sigma_comm, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray32ToWasm0(coefficients_comm, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    _assertClass(generic_comm, WasmFpPolyComm);
    _assertClass(psm_comm, WasmFpPolyComm);
    _assertClass(complete_add_comm, WasmFpPolyComm);
    _assertClass(mul_comm, WasmFpPolyComm);
    _assertClass(emul_comm, WasmFpPolyComm);
    _assertClass(endomul_scalar_comm, WasmFpPolyComm);
    var ret = wasm.wasmfpplonkverificationevals_new(ptr0, len0, ptr1, len1, generic_comm.ptr, psm_comm.ptr, complete_add_comm.ptr, mul_comm.ptr, emul_comm.ptr, endomul_scalar_comm.ptr);
    return WasmFpPlonkVerificationEvals.__wrap(ret);
  }
  get sigma_comm() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfpplonkverificationevals_sigma_comm(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set sigma_comm(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfpplonkverificationevals_set_sigma_comm(this.ptr, ptr0, len0);
  }
  get coefficients_comm() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfpplonkverificationevals_coefficients_comm(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set coefficients_comm(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfpplonkverificationevals_set_coefficients_comm(this.ptr, ptr0, len0);
  }
  get generic_comm() {
    var ret = wasm.wasmfpplonkverificationevals_generic_comm(this.ptr);
    return WasmFpPolyComm.__wrap(ret);
  }
  set generic_comm(x) {
    _assertClass(x, WasmFpPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverificationevals_set_generic_comm(this.ptr, ptr0);
  }
  get psm_comm() {
    var ret = wasm.wasmfpplonkverificationevals_psm_comm(this.ptr);
    return WasmFpPolyComm.__wrap(ret);
  }
  set psm_comm(x) {
    _assertClass(x, WasmFpPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverificationevals_set_psm_comm(this.ptr, ptr0);
  }
  get complete_add_comm() {
    var ret = wasm.wasmfpplonkverificationevals_complete_add_comm(this.ptr);
    return WasmFpPolyComm.__wrap(ret);
  }
  set complete_add_comm(x) {
    _assertClass(x, WasmFpPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverificationevals_set_complete_add_comm(this.ptr, ptr0);
  }
  get mul_comm() {
    var ret = wasm.wasmfpplonkverificationevals_mul_comm(this.ptr);
    return WasmFpPolyComm.__wrap(ret);
  }
  set mul_comm(x) {
    _assertClass(x, WasmFpPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverificationevals_set_mul_comm(this.ptr, ptr0);
  }
  get emul_comm() {
    var ret = wasm.wasmfpplonkverificationevals_emul_comm(this.ptr);
    return WasmFpPolyComm.__wrap(ret);
  }
  set emul_comm(x) {
    _assertClass(x, WasmFpPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverificationevals_set_emul_comm(this.ptr, ptr0);
  }
  get endomul_scalar_comm() {
    var ret = wasm.wasmfpplonkverificationevals_endomul_scalar_comm(this.ptr);
    return WasmFpPolyComm.__wrap(ret);
  }
  set endomul_scalar_comm(x) {
    _assertClass(x, WasmFpPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverificationevals_set_endomul_scalar_comm(this.ptr, ptr0);
  }
  get chacha_comm() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfpplonkverificationevals_chacha_comm(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set chacha_comm(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfpplonkverificationevals_set_chacha_comm(this.ptr, ptr0, len0);
  }
};
var WasmFpPlonkVerifierIndex = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpPlonkVerifierIndex.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfpplonkverifierindex_free(ptr);
  }
  get domain() {
    var ret = wasm.__wbg_get_wasmfpplonkverifierindex_domain(this.ptr);
    return WasmFpDomain.__wrap(ret);
  }
  set domain(arg0) {
    _assertClass(arg0, WasmFpDomain);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmfpplonkverifierindex_domain(this.ptr, ptr0);
  }
  get max_poly_size() {
    var ret = wasm.__wbg_get_wasmfpplonkverifierindex_max_poly_size(this.ptr);
    return ret;
  }
  set max_poly_size(arg0) {
    wasm.__wbg_set_wasmfpplonkverifierindex_max_poly_size(this.ptr, arg0);
  }
  get max_quot_size() {
    var ret = wasm.__wbg_get_wasmfpplonkverifierindex_max_quot_size(this.ptr);
    return ret;
  }
  set max_quot_size(arg0) {
    wasm.__wbg_set_wasmfpplonkverifierindex_max_quot_size(this.ptr, arg0);
  }
  get shifts() {
    var ret = wasm.__wbg_get_wasmfpplonkverifierindex_shifts(this.ptr);
    return WasmFpShifts.__wrap(ret);
  }
  set shifts(arg0) {
    _assertClass(arg0, WasmFpShifts);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmfpplonkverifierindex_shifts(this.ptr, ptr0);
  }
  constructor(domain, max_poly_size, max_quot_size, srs, evals, shifts, linearization) {
    _assertClass(domain, WasmFpDomain);
    _assertClass(srs, WasmFpSrs);
    _assertClass(evals, WasmFpPlonkVerificationEvals);
    _assertClass(shifts, WasmFpShifts);
    _assertClass(linearization, WasmFpLinearization);
    var ret = wasm.wasmfpplonkverifierindex_new(domain.ptr, max_poly_size, max_quot_size, srs.ptr, evals.ptr, shifts.ptr, linearization.ptr);
    return WasmFpPlonkVerifierIndex.__wrap(ret);
  }
  get srs() {
    var ret = wasm.wasmfpplonkverifierindex_srs(this.ptr);
    return WasmFpSrs.__wrap(ret);
  }
  set srs(x) {
    _assertClass(x, WasmFpSrs);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverifierindex_set_srs(this.ptr, ptr0);
  }
  get evals() {
    var ret = wasm.wasmfpplonkverifierindex_evals(this.ptr);
    return WasmFpPlonkVerificationEvals.__wrap(ret);
  }
  set evals(x) {
    _assertClass(x, WasmFpPlonkVerificationEvals);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverifierindex_set_evals(this.ptr, ptr0);
  }
};
var WasmFpPolyComm = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpPolyComm.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfppolycomm_free(ptr);
  }
  constructor(unshifted, shifted) {
    var ptr0 = passArray32ToWasm0(unshifted, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    let ptr1 = 0;
    if (!isLikeNone(shifted)) {
      _assertClass(shifted, WasmGVesta);
      ptr1 = shifted.ptr;
      shifted.ptr = 0;
    }
    var ret = wasm.wasmfppolycomm_new(ptr0, len0, ptr1);
    return WasmFpPolyComm.__wrap(ret);
  }
  get unshifted() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfppolycomm_unshifted(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set unshifted(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfppolycomm_set_unshifted(this.ptr, ptr0, len0);
  }
  get shifted() {
    var ret = wasm.__wbg_get_wasmfppolycomm_shifted(this.ptr);
    return ret === 0 ? void 0 : WasmGVesta.__wrap(ret);
  }
  set shifted(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, WasmGVesta);
      ptr0 = arg0.ptr;
      arg0.ptr = 0;
    }
    wasm.__wbg_set_wasmfppolycomm_shifted(this.ptr, ptr0);
  }
};
var WasmFpProofEvaluations = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpProofEvaluations.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfpproofevaluations_free(ptr);
  }
  constructor(w, z, s, generic_selector, poseidon_selector) {
    _assertClass(w, WasmVecVecFp);
    var ptr0 = w.ptr;
    w.ptr = 0;
    var ptr1 = passArray8ToWasm0(z, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    _assertClass(s, WasmVecVecFp);
    var ptr2 = s.ptr;
    s.ptr = 0;
    var ptr3 = passArray8ToWasm0(generic_selector, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(poseidon_selector, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    var ret = wasm.wasmfpproofevaluations_new(ptr0, ptr1, len1, ptr2, ptr3, len3, ptr4, len4);
    return WasmFpProofEvaluations.__wrap(ret);
  }
  get w() {
    var ret = wasm.wasmfpproofevaluations_w(this.ptr);
    return WasmVecVecFp.__wrap(ret);
  }
  get z() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfpproofevaluations_z(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get s() {
    var ret = wasm.wasmfpproofevaluations_s(this.ptr);
    return WasmVecVecFp.__wrap(ret);
  }
  get generic_selector() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfpproofevaluations_generic_selector(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get poseidon_selector() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfpproofevaluations_poseidon_selector(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set w(x) {
    _assertClass(x, WasmVecVecFp);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpproofevaluations_set_w(this.ptr, ptr0);
  }
  set s(x) {
    _assertClass(x, WasmVecVecFp);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpproofevaluations_set_s(this.ptr, ptr0);
  }
  set z(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfpproofevaluations_set_z(this.ptr, ptr0, len0);
  }
  set generic_selector(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfpproofevaluations_set_generic_selector(this.ptr, ptr0, len0);
  }
  set poseidon_selector(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfpproofevaluations_set_poseidon_selector(this.ptr, ptr0, len0);
  }
};
var WasmFpProverCommitments = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpProverCommitments.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfpprovercommitments_free(ptr);
  }
  constructor(w_comm, z_comm, t_comm) {
    var ptr0 = passArray32ToWasm0(w_comm, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    _assertClass(z_comm, WasmFpPolyComm);
    var ptr1 = z_comm.ptr;
    z_comm.ptr = 0;
    _assertClass(t_comm, WasmFpPolyComm);
    var ptr2 = t_comm.ptr;
    t_comm.ptr = 0;
    var ret = wasm.wasmfpprovercommitments_new(ptr0, len0, ptr1, ptr2);
    return WasmFpProverCommitments.__wrap(ret);
  }
  get w_comm() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfpprovercommitments_w_comm(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get z_comm() {
    var ret = wasm.wasmfpprovercommitments_z_comm(this.ptr);
    return WasmFpPolyComm.__wrap(ret);
  }
  get t_comm() {
    var ret = wasm.wasmfpprovercommitments_t_comm(this.ptr);
    return WasmFpPolyComm.__wrap(ret);
  }
  set w_comm(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfpprovercommitments_set_w_comm(this.ptr, ptr0, len0);
  }
  set z_comm(x) {
    _assertClass(x, WasmFpPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpprovercommitments_set_z_comm(this.ptr, ptr0);
  }
  set t_comm(x) {
    _assertClass(x, WasmFpPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpprovercommitments_set_t_comm(this.ptr, ptr0);
  }
};
var WasmFpProverProof = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpProverProof.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfpproverproof_free(ptr);
  }
  get ft_eval1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfpproverproof_ft_eval1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set ft_eval1(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfpproverproof_ft_eval1(this.ptr, ptr0, len0);
  }
  constructor(commitments, proof, evals0, evals1, ft_eval1, public_, prev_challenges_scalars, prev_challenges_comms) {
    _assertClass(commitments, WasmFpProverCommitments);
    var ptr0 = commitments.ptr;
    commitments.ptr = 0;
    _assertClass(proof, WasmFpOpeningProof);
    var ptr1 = proof.ptr;
    proof.ptr = 0;
    _assertClass(evals0, WasmFpProofEvaluations);
    var ptr2 = evals0.ptr;
    evals0.ptr = 0;
    _assertClass(evals1, WasmFpProofEvaluations);
    var ptr3 = evals1.ptr;
    evals1.ptr = 0;
    var ptr4 = passArray8ToWasm0(ft_eval1, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    var ptr5 = passArray8ToWasm0(public_, wasm.__wbindgen_malloc);
    var len5 = WASM_VECTOR_LEN;
    _assertClass(prev_challenges_scalars, WasmVecVecFp);
    var ptr6 = prev_challenges_scalars.ptr;
    prev_challenges_scalars.ptr = 0;
    var ptr7 = passArray32ToWasm0(prev_challenges_comms, wasm.__wbindgen_malloc);
    var len7 = WASM_VECTOR_LEN;
    var ret = wasm.wasmfpproverproof_new(ptr0, ptr1, ptr2, ptr3, ptr4, len4, ptr5, len5, ptr6, ptr7, len7);
    return WasmFpProverProof.__wrap(ret);
  }
  get commitments() {
    var ret = wasm.wasmfpproverproof_commitments(this.ptr);
    return WasmFpProverCommitments.__wrap(ret);
  }
  get proof() {
    var ret = wasm.wasmfpproverproof_proof(this.ptr);
    return WasmFpOpeningProof.__wrap(ret);
  }
  get evals0() {
    var ret = wasm.wasmfpproverproof_evals0(this.ptr);
    return WasmFpProofEvaluations.__wrap(ret);
  }
  get evals1() {
    var ret = wasm.wasmfpproverproof_evals1(this.ptr);
    return WasmFpProofEvaluations.__wrap(ret);
  }
  get public_() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfpproverproof_public_(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get prev_challenges_scalars() {
    var ret = wasm.wasmfpproverproof_prev_challenges_scalars(this.ptr);
    return WasmVecVecFp.__wrap(ret);
  }
  get prev_challenges_comms() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfpproverproof_prev_challenges_comms(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set commitments(commitments) {
    _assertClass(commitments, WasmFpProverCommitments);
    var ptr0 = commitments.ptr;
    commitments.ptr = 0;
    wasm.wasmfpproverproof_set_commitments(this.ptr, ptr0);
  }
  set proof(proof) {
    _assertClass(proof, WasmFpOpeningProof);
    var ptr0 = proof.ptr;
    proof.ptr = 0;
    wasm.wasmfpproverproof_set_proof(this.ptr, ptr0);
  }
  set evals0(evals0) {
    _assertClass(evals0, WasmFpProofEvaluations);
    var ptr0 = evals0.ptr;
    evals0.ptr = 0;
    wasm.wasmfpproverproof_set_evals0(this.ptr, ptr0);
  }
  set evals1(evals1) {
    _assertClass(evals1, WasmFpProofEvaluations);
    var ptr0 = evals1.ptr;
    evals1.ptr = 0;
    wasm.wasmfpproverproof_set_evals1(this.ptr, ptr0);
  }
  set public_(public_) {
    var ptr0 = passArray8ToWasm0(public_, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfpproverproof_set_public_(this.ptr, ptr0, len0);
  }
  set prev_challenges_scalars(prev_challenges_scalars) {
    _assertClass(prev_challenges_scalars, WasmVecVecFp);
    var ptr0 = prev_challenges_scalars.ptr;
    prev_challenges_scalars.ptr = 0;
    wasm.wasmfpproverproof_set_prev_challenges_scalars(this.ptr, ptr0);
  }
  set prev_challenges_comms(prev_challenges_comms) {
    var ptr0 = passArray32ToWasm0(prev_challenges_comms, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfpproverproof_set_prev_challenges_comms(this.ptr, ptr0, len0);
  }
};
var WasmFpRandomOracles = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpRandomOracles.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfprandomoracles_free(ptr);
  }
  get joint_combiner_chal() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfprandomoracles_joint_combiner_chal(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set joint_combiner_chal(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfprandomoracles_joint_combiner_chal(this.ptr, ptr0, len0);
  }
  get joint_combiner() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfprandomoracles_joint_combiner(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set joint_combiner(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfprandomoracles_joint_combiner(this.ptr, ptr0, len0);
  }
  get beta() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfprandomoracles_beta(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set beta(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfprandomoracles_beta(this.ptr, ptr0, len0);
  }
  get gamma() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfprandomoracles_gamma(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set gamma(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfprandomoracles_gamma(this.ptr, ptr0, len0);
  }
  get alpha_chal() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfprandomoracles_alpha_chal(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set alpha_chal(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfprandomoracles_alpha_chal(this.ptr, ptr0, len0);
  }
  get alpha() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfprandomoracles_alpha(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set alpha(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfprandomoracles_alpha(this.ptr, ptr0, len0);
  }
  get zeta() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfprandomoracles_zeta(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set zeta(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfprandomoracles_zeta(this.ptr, ptr0, len0);
  }
  get v() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfprandomoracles_v(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set v(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfprandomoracles_v(this.ptr, ptr0, len0);
  }
  get u() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfprandomoracles_u(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set u(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfprandomoracles_u(this.ptr, ptr0, len0);
  }
  get zeta_chal() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfprandomoracles_zeta_chal(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set zeta_chal(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfprandomoracles_zeta_chal(this.ptr, ptr0, len0);
  }
  get v_chal() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfprandomoracles_v_chal(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set v_chal(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfprandomoracles_v_chal(this.ptr, ptr0, len0);
  }
  get u_chal() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfprandomoracles_u_chal(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set u_chal(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfprandomoracles_u_chal(this.ptr, ptr0, len0);
  }
  constructor(joint_combiner_chal, joint_combiner, beta, gamma, alpha_chal, alpha, zeta, v, u, zeta_chal, v_chal, u_chal) {
    var ptr0 = passArray8ToWasm0(joint_combiner_chal, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(joint_combiner, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passArray8ToWasm0(beta, wasm.__wbindgen_malloc);
    var len2 = WASM_VECTOR_LEN;
    var ptr3 = passArray8ToWasm0(gamma, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(alpha_chal, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    var ptr5 = passArray8ToWasm0(alpha, wasm.__wbindgen_malloc);
    var len5 = WASM_VECTOR_LEN;
    var ptr6 = passArray8ToWasm0(zeta, wasm.__wbindgen_malloc);
    var len6 = WASM_VECTOR_LEN;
    var ptr7 = passArray8ToWasm0(v, wasm.__wbindgen_malloc);
    var len7 = WASM_VECTOR_LEN;
    var ptr8 = passArray8ToWasm0(u, wasm.__wbindgen_malloc);
    var len8 = WASM_VECTOR_LEN;
    var ptr9 = passArray8ToWasm0(zeta_chal, wasm.__wbindgen_malloc);
    var len9 = WASM_VECTOR_LEN;
    var ptr10 = passArray8ToWasm0(v_chal, wasm.__wbindgen_malloc);
    var len10 = WASM_VECTOR_LEN;
    var ptr11 = passArray8ToWasm0(u_chal, wasm.__wbindgen_malloc);
    var len11 = WASM_VECTOR_LEN;
    var ret = wasm.wasmfprandomoracles_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11);
    return WasmFpRandomOracles.__wrap(ret);
  }
};
var WasmFpShifts = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpShifts.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfpshifts_free(ptr);
  }
  get s0() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfpdomain_group_gen(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s0(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfpdomain_group_gen(this.ptr, ptr0, len0);
  }
  get s1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfpshifts_s1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s1(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfpshifts_s1(this.ptr, ptr0, len0);
  }
  get s2() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfpshifts_s2(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s2(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfpshifts_s2(this.ptr, ptr0, len0);
  }
  get s3() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfpshifts_s3(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s3(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfpshifts_s3(this.ptr, ptr0, len0);
  }
  get s4() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfpshifts_s4(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s4(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfpshifts_s4(this.ptr, ptr0, len0);
  }
  get s5() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfpshifts_s5(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s5(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfpshifts_s5(this.ptr, ptr0, len0);
  }
  get s6() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfpshifts_s6(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s6(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfpshifts_s6(this.ptr, ptr0, len0);
  }
};
var WasmFpSrs = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFpSrs.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfpsrs_free(ptr);
  }
};
var WasmFqDomain = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqDomain.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqdomain_free(ptr);
  }
  get log_size_of_group() {
    var ret = wasm.__wbg_get_wasmfpdomain_log_size_of_group(this.ptr);
    return ret;
  }
  set log_size_of_group(arg0) {
    wasm.__wbg_set_wasmfpdomain_log_size_of_group(this.ptr, arg0);
  }
  get group_gen() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqdomain_group_gen(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set group_gen(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqdomain_group_gen(this.ptr, ptr0, len0);
  }
  constructor(log_size_of_group, group_gen) {
    var ptr0 = passArray8ToWasm0(group_gen, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.wasmfqdomain_new(log_size_of_group, ptr0, len0);
    return WasmFqDomain.__wrap(ret);
  }
};
var WasmFqGate = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqGate.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqgate_free(ptr);
  }
  get row() {
    var ret = wasm.__wbg_get_wasmfpgate_row(this.ptr);
    return ret >>> 0;
  }
  set row(arg0) {
    wasm.__wbg_set_wasmfpgate_row(this.ptr, arg0);
  }
  get typ() {
    var ret = wasm.__wbg_get_wasmfpgate_typ(this.ptr);
    return ret >>> 0;
  }
  set typ(arg0) {
    wasm.__wbg_set_wasmfpgate_typ(this.ptr, arg0);
  }
  get wires() {
    var ret = wasm.__wbg_get_wasmfpgate_wires(this.ptr);
    return WasmGateWires.__wrap(ret);
  }
  set wires(arg0) {
    _assertClass(arg0, WasmGateWires);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmfpgate_wires(this.ptr, ptr0);
  }
  constructor(row, typ, wires, c) {
    _assertClass(wires, WasmGateWires);
    var ptr0 = wires.ptr;
    wires.ptr = 0;
    var ptr1 = passArray8ToWasm0(c, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.wasmfqgate_new(row, typ, ptr0, ptr1, len1);
    return WasmFqGate.__wrap(ret);
  }
};
var WasmFqGateVector = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqGateVector.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqgatevector_free(ptr);
  }
};
var WasmFqLinearization = class {
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqlinearization_free(ptr);
  }
};
var WasmFqOpeningProof = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqOpeningProof.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqopeningproof_free(ptr);
  }
  get z1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqopeningproof_z1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set z1(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqopeningproof_z1(this.ptr, ptr0, len0);
  }
  get z2() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqopeningproof_z2(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set z2(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqopeningproof_z2(this.ptr, ptr0, len0);
  }
  constructor(lr_0, lr_1, delta, z1, z2, sg) {
    var ptr0 = passArray32ToWasm0(lr_0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray32ToWasm0(lr_1, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    _assertClass(delta, WasmGPallas);
    var ptr2 = delta.ptr;
    delta.ptr = 0;
    var ptr3 = passArray8ToWasm0(z1, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(z2, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    _assertClass(sg, WasmGPallas);
    var ptr5 = sg.ptr;
    sg.ptr = 0;
    var ret = wasm.wasmfqopeningproof_new(ptr0, len0, ptr1, len1, ptr2, ptr3, len3, ptr4, len4, ptr5);
    return WasmFqOpeningProof.__wrap(ret);
  }
  get lr_0() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfqopeningproof_lr_0(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get lr_1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfqopeningproof_lr_1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get delta() {
    var ret = wasm.wasmfpopeningproof_delta(this.ptr);
    return WasmGPallas.__wrap(ret);
  }
  get sg() {
    var ret = wasm.wasmfpopeningproof_sg(this.ptr);
    return WasmGPallas.__wrap(ret);
  }
  set lr_0(lr_0) {
    var ptr0 = passArray32ToWasm0(lr_0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfqopeningproof_set_lr_0(this.ptr, ptr0, len0);
  }
  set lr_1(lr_1) {
    var ptr0 = passArray32ToWasm0(lr_1, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfqopeningproof_set_lr_1(this.ptr, ptr0, len0);
  }
  set delta(delta) {
    _assertClass(delta, WasmGPallas);
    var ptr0 = delta.ptr;
    delta.ptr = 0;
    wasm.wasmfpopeningproof_set_delta(this.ptr, ptr0);
  }
  set sg(sg) {
    _assertClass(sg, WasmGPallas);
    var ptr0 = sg.ptr;
    sg.ptr = 0;
    wasm.wasmfpopeningproof_set_sg(this.ptr, ptr0);
  }
};
var WasmFqOracles = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqOracles.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqoracles_free(ptr);
  }
  get o() {
    var ret = wasm.__wbg_get_wasmfporacles_o(this.ptr);
    return WasmFqRandomOracles.__wrap(ret);
  }
  set o(arg0) {
    _assertClass(arg0, WasmFqRandomOracles);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmfporacles_o(this.ptr, ptr0);
  }
  get p_eval0() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqoracles_p_eval0(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set p_eval0(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqoracles_p_eval0(this.ptr, ptr0, len0);
  }
  get p_eval1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqoracles_p_eval1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set p_eval1(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqoracles_p_eval1(this.ptr, ptr0, len0);
  }
  get digest_before_evaluations() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqoracles_digest_before_evaluations(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set digest_before_evaluations(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqoracles_digest_before_evaluations(this.ptr, ptr0, len0);
  }
  constructor(o, p_eval0, p_eval1, opening_prechallenges, digest_before_evaluations) {
    _assertClass(o, WasmFqRandomOracles);
    var ptr0 = o.ptr;
    o.ptr = 0;
    var ptr1 = passArray8ToWasm0(p_eval0, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passArray8ToWasm0(p_eval1, wasm.__wbindgen_malloc);
    var len2 = WASM_VECTOR_LEN;
    var ptr3 = passArray8ToWasm0(opening_prechallenges, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(digest_before_evaluations, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    var ret = wasm.wasmfqoracles_new(ptr0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
    return WasmFqOracles.__wrap(ret);
  }
};
var WasmFqPlonkVerificationEvals = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqPlonkVerificationEvals.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqplonkverificationevals_free(ptr);
  }
  constructor(sigma_comm, coefficients_comm, generic_comm, psm_comm, complete_add_comm, mul_comm, emul_comm, endomul_scalar_comm) {
    var ptr0 = passArray32ToWasm0(sigma_comm, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray32ToWasm0(coefficients_comm, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    _assertClass(generic_comm, WasmFqPolyComm);
    _assertClass(psm_comm, WasmFqPolyComm);
    _assertClass(complete_add_comm, WasmFqPolyComm);
    _assertClass(mul_comm, WasmFqPolyComm);
    _assertClass(emul_comm, WasmFqPolyComm);
    _assertClass(endomul_scalar_comm, WasmFqPolyComm);
    var ret = wasm.wasmfqplonkverificationevals_new(ptr0, len0, ptr1, len1, generic_comm.ptr, psm_comm.ptr, complete_add_comm.ptr, mul_comm.ptr, emul_comm.ptr, endomul_scalar_comm.ptr);
    return WasmFqPlonkVerificationEvals.__wrap(ret);
  }
  get sigma_comm() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfqplonkverificationevals_sigma_comm(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set sigma_comm(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfqplonkverificationevals_set_sigma_comm(this.ptr, ptr0, len0);
  }
  get coefficients_comm() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfqplonkverificationevals_coefficients_comm(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set coefficients_comm(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfqplonkverificationevals_set_coefficients_comm(this.ptr, ptr0, len0);
  }
  get generic_comm() {
    var ret = wasm.wasmfpplonkverificationevals_generic_comm(this.ptr);
    return WasmFqPolyComm.__wrap(ret);
  }
  set generic_comm(x) {
    _assertClass(x, WasmFqPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverificationevals_set_generic_comm(this.ptr, ptr0);
  }
  get psm_comm() {
    var ret = wasm.wasmfpplonkverificationevals_psm_comm(this.ptr);
    return WasmFqPolyComm.__wrap(ret);
  }
  set psm_comm(x) {
    _assertClass(x, WasmFqPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverificationevals_set_psm_comm(this.ptr, ptr0);
  }
  get complete_add_comm() {
    var ret = wasm.wasmfpplonkverificationevals_complete_add_comm(this.ptr);
    return WasmFqPolyComm.__wrap(ret);
  }
  set complete_add_comm(x) {
    _assertClass(x, WasmFqPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverificationevals_set_complete_add_comm(this.ptr, ptr0);
  }
  get mul_comm() {
    var ret = wasm.wasmfpplonkverificationevals_mul_comm(this.ptr);
    return WasmFqPolyComm.__wrap(ret);
  }
  set mul_comm(x) {
    _assertClass(x, WasmFqPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverificationevals_set_mul_comm(this.ptr, ptr0);
  }
  get emul_comm() {
    var ret = wasm.wasmfpplonkverificationevals_emul_comm(this.ptr);
    return WasmFqPolyComm.__wrap(ret);
  }
  set emul_comm(x) {
    _assertClass(x, WasmFqPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverificationevals_set_emul_comm(this.ptr, ptr0);
  }
  get endomul_scalar_comm() {
    var ret = wasm.wasmfpplonkverificationevals_endomul_scalar_comm(this.ptr);
    return WasmFqPolyComm.__wrap(ret);
  }
  set endomul_scalar_comm(x) {
    _assertClass(x, WasmFqPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverificationevals_set_endomul_scalar_comm(this.ptr, ptr0);
  }
  get chacha_comm() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfqplonkverificationevals_chacha_comm(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set chacha_comm(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfqplonkverificationevals_set_chacha_comm(this.ptr, ptr0, len0);
  }
};
var WasmFqPlonkVerifierIndex = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqPlonkVerifierIndex.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqplonkverifierindex_free(ptr);
  }
  get domain() {
    var ret = wasm.__wbg_get_wasmfpplonkverifierindex_domain(this.ptr);
    return WasmFqDomain.__wrap(ret);
  }
  set domain(arg0) {
    _assertClass(arg0, WasmFqDomain);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmfpplonkverifierindex_domain(this.ptr, ptr0);
  }
  get max_poly_size() {
    var ret = wasm.__wbg_get_wasmfpplonkverifierindex_max_poly_size(this.ptr);
    return ret;
  }
  set max_poly_size(arg0) {
    wasm.__wbg_set_wasmfpplonkverifierindex_max_poly_size(this.ptr, arg0);
  }
  get max_quot_size() {
    var ret = wasm.__wbg_get_wasmfpplonkverifierindex_max_quot_size(this.ptr);
    return ret;
  }
  set max_quot_size(arg0) {
    wasm.__wbg_set_wasmfpplonkverifierindex_max_quot_size(this.ptr, arg0);
  }
  get shifts() {
    var ret = wasm.__wbg_get_wasmfpplonkverifierindex_shifts(this.ptr);
    return WasmFqShifts.__wrap(ret);
  }
  set shifts(arg0) {
    _assertClass(arg0, WasmFqShifts);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmfpplonkverifierindex_shifts(this.ptr, ptr0);
  }
  constructor(domain, max_poly_size, max_quot_size, srs, evals, shifts, linearization) {
    _assertClass(domain, WasmFqDomain);
    _assertClass(srs, WasmFqSrs);
    _assertClass(evals, WasmFqPlonkVerificationEvals);
    _assertClass(shifts, WasmFqShifts);
    _assertClass(linearization, WasmFqLinearization);
    var ret = wasm.wasmfqplonkverifierindex_new(domain.ptr, max_poly_size, max_quot_size, srs.ptr, evals.ptr, shifts.ptr, linearization.ptr);
    return WasmFqPlonkVerifierIndex.__wrap(ret);
  }
  get srs() {
    var ret = wasm.wasmfpplonkverifierindex_srs(this.ptr);
    return WasmFqSrs.__wrap(ret);
  }
  set srs(x) {
    _assertClass(x, WasmFqSrs);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfqplonkverifierindex_set_srs(this.ptr, ptr0);
  }
  get evals() {
    var ret = wasm.wasmfqplonkverifierindex_evals(this.ptr);
    return WasmFqPlonkVerificationEvals.__wrap(ret);
  }
  set evals(x) {
    _assertClass(x, WasmFqPlonkVerificationEvals);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpplonkverifierindex_set_evals(this.ptr, ptr0);
  }
};
var WasmFqPolyComm = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqPolyComm.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqpolycomm_free(ptr);
  }
  constructor(unshifted, shifted) {
    var ptr0 = passArray32ToWasm0(unshifted, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    let ptr1 = 0;
    if (!isLikeNone(shifted)) {
      _assertClass(shifted, WasmGPallas);
      ptr1 = shifted.ptr;
      shifted.ptr = 0;
    }
    var ret = wasm.wasmfqpolycomm_new(ptr0, len0, ptr1);
    return WasmFqPolyComm.__wrap(ret);
  }
  get unshifted() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfqpolycomm_unshifted(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set unshifted(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfqpolycomm_set_unshifted(this.ptr, ptr0, len0);
  }
  get shifted() {
    var ret = wasm.__wbg_get_wasmfppolycomm_shifted(this.ptr);
    return ret === 0 ? void 0 : WasmGPallas.__wrap(ret);
  }
  set shifted(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, WasmGPallas);
      ptr0 = arg0.ptr;
      arg0.ptr = 0;
    }
    wasm.__wbg_set_wasmfppolycomm_shifted(this.ptr, ptr0);
  }
};
var WasmFqProofEvaluations = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqProofEvaluations.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqproofevaluations_free(ptr);
  }
  constructor(w, z, s, generic_selector, poseidon_selector) {
    _assertClass(w, WasmVecVecFq);
    var ptr0 = w.ptr;
    w.ptr = 0;
    var ptr1 = passArray8ToWasm0(z, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    _assertClass(s, WasmVecVecFq);
    var ptr2 = s.ptr;
    s.ptr = 0;
    var ptr3 = passArray8ToWasm0(generic_selector, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(poseidon_selector, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    var ret = wasm.wasmfqproofevaluations_new(ptr0, ptr1, len1, ptr2, ptr3, len3, ptr4, len4);
    return WasmFqProofEvaluations.__wrap(ret);
  }
  get w() {
    var ret = wasm.wasmfqproofevaluations_w(this.ptr);
    return WasmVecVecFq.__wrap(ret);
  }
  get z() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfqproofevaluations_z(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get s() {
    var ret = wasm.wasmfqproofevaluations_s(this.ptr);
    return WasmVecVecFq.__wrap(ret);
  }
  get generic_selector() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfqproofevaluations_generic_selector(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get poseidon_selector() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfqproofevaluations_poseidon_selector(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set w(x) {
    _assertClass(x, WasmVecVecFq);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpproofevaluations_set_w(this.ptr, ptr0);
  }
  set s(x) {
    _assertClass(x, WasmVecVecFq);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpproofevaluations_set_s(this.ptr, ptr0);
  }
  set z(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfqproofevaluations_set_z(this.ptr, ptr0, len0);
  }
  set generic_selector(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfqproofevaluations_set_generic_selector(this.ptr, ptr0, len0);
  }
  set poseidon_selector(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfqproofevaluations_set_poseidon_selector(this.ptr, ptr0, len0);
  }
};
var WasmFqProverCommitments = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqProverCommitments.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqprovercommitments_free(ptr);
  }
  constructor(w_comm, z_comm, t_comm) {
    var ptr0 = passArray32ToWasm0(w_comm, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    _assertClass(z_comm, WasmFqPolyComm);
    var ptr1 = z_comm.ptr;
    z_comm.ptr = 0;
    _assertClass(t_comm, WasmFqPolyComm);
    var ptr2 = t_comm.ptr;
    t_comm.ptr = 0;
    var ret = wasm.wasmfqprovercommitments_new(ptr0, len0, ptr1, ptr2);
    return WasmFqProverCommitments.__wrap(ret);
  }
  get w_comm() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfqprovercommitments_w_comm(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get z_comm() {
    var ret = wasm.wasmfpprovercommitments_z_comm(this.ptr);
    return WasmFqPolyComm.__wrap(ret);
  }
  get t_comm() {
    var ret = wasm.wasmfpprovercommitments_t_comm(this.ptr);
    return WasmFqPolyComm.__wrap(ret);
  }
  set w_comm(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfqprovercommitments_set_w_comm(this.ptr, ptr0, len0);
  }
  set z_comm(x) {
    _assertClass(x, WasmFqPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpprovercommitments_set_z_comm(this.ptr, ptr0);
  }
  set t_comm(x) {
    _assertClass(x, WasmFqPolyComm);
    var ptr0 = x.ptr;
    x.ptr = 0;
    wasm.wasmfpprovercommitments_set_t_comm(this.ptr, ptr0);
  }
};
var WasmFqProverProof = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqProverProof.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqproverproof_free(ptr);
  }
  get ft_eval1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqproverproof_ft_eval1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set ft_eval1(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqproverproof_ft_eval1(this.ptr, ptr0, len0);
  }
  constructor(commitments, proof, evals0, evals1, ft_eval1, public_, prev_challenges_scalars, prev_challenges_comms) {
    _assertClass(commitments, WasmFqProverCommitments);
    var ptr0 = commitments.ptr;
    commitments.ptr = 0;
    _assertClass(proof, WasmFqOpeningProof);
    var ptr1 = proof.ptr;
    proof.ptr = 0;
    _assertClass(evals0, WasmFqProofEvaluations);
    var ptr2 = evals0.ptr;
    evals0.ptr = 0;
    _assertClass(evals1, WasmFqProofEvaluations);
    var ptr3 = evals1.ptr;
    evals1.ptr = 0;
    var ptr4 = passArray8ToWasm0(ft_eval1, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    var ptr5 = passArray8ToWasm0(public_, wasm.__wbindgen_malloc);
    var len5 = WASM_VECTOR_LEN;
    _assertClass(prev_challenges_scalars, WasmVecVecFq);
    var ptr6 = prev_challenges_scalars.ptr;
    prev_challenges_scalars.ptr = 0;
    var ptr7 = passArray32ToWasm0(prev_challenges_comms, wasm.__wbindgen_malloc);
    var len7 = WASM_VECTOR_LEN;
    var ret = wasm.wasmfqproverproof_new(ptr0, ptr1, ptr2, ptr3, ptr4, len4, ptr5, len5, ptr6, ptr7, len7);
    return WasmFqProverProof.__wrap(ret);
  }
  get commitments() {
    var ret = wasm.wasmfqproverproof_commitments(this.ptr);
    return WasmFqProverCommitments.__wrap(ret);
  }
  get proof() {
    var ret = wasm.wasmfpproverproof_proof(this.ptr);
    return WasmFqOpeningProof.__wrap(ret);
  }
  get evals0() {
    var ret = wasm.wasmfqproverproof_evals0(this.ptr);
    return WasmFqProofEvaluations.__wrap(ret);
  }
  get evals1() {
    var ret = wasm.wasmfqproverproof_evals1(this.ptr);
    return WasmFqProofEvaluations.__wrap(ret);
  }
  get public_() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfqproverproof_public_(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  get prev_challenges_scalars() {
    var ret = wasm.wasmfqproverproof_prev_challenges_scalars(this.ptr);
    return WasmVecVecFq.__wrap(ret);
  }
  get prev_challenges_comms() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmfqproverproof_prev_challenges_comms(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU32FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set commitments(commitments) {
    _assertClass(commitments, WasmFqProverCommitments);
    var ptr0 = commitments.ptr;
    commitments.ptr = 0;
    wasm.wasmfpproverproof_set_commitments(this.ptr, ptr0);
  }
  set proof(proof) {
    _assertClass(proof, WasmFqOpeningProof);
    var ptr0 = proof.ptr;
    proof.ptr = 0;
    wasm.wasmfpproverproof_set_proof(this.ptr, ptr0);
  }
  set evals0(evals0) {
    _assertClass(evals0, WasmFqProofEvaluations);
    var ptr0 = evals0.ptr;
    evals0.ptr = 0;
    wasm.wasmfpproverproof_set_evals0(this.ptr, ptr0);
  }
  set evals1(evals1) {
    _assertClass(evals1, WasmFqProofEvaluations);
    var ptr0 = evals1.ptr;
    evals1.ptr = 0;
    wasm.wasmfpproverproof_set_evals1(this.ptr, ptr0);
  }
  set public_(public_) {
    var ptr0 = passArray8ToWasm0(public_, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfqproverproof_set_public_(this.ptr, ptr0, len0);
  }
  set prev_challenges_scalars(prev_challenges_scalars) {
    _assertClass(prev_challenges_scalars, WasmVecVecFq);
    var ptr0 = prev_challenges_scalars.ptr;
    prev_challenges_scalars.ptr = 0;
    wasm.wasmfpproverproof_set_prev_challenges_scalars(this.ptr, ptr0);
  }
  set prev_challenges_comms(prev_challenges_comms) {
    var ptr0 = passArray32ToWasm0(prev_challenges_comms, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmfqproverproof_set_prev_challenges_comms(this.ptr, ptr0, len0);
  }
};
var WasmFqRandomOracles = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqRandomOracles.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqrandomoracles_free(ptr);
  }
  get joint_combiner_chal() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqrandomoracles_joint_combiner_chal(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set joint_combiner_chal(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqrandomoracles_joint_combiner_chal(this.ptr, ptr0, len0);
  }
  get joint_combiner() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqrandomoracles_joint_combiner(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set joint_combiner(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqrandomoracles_joint_combiner(this.ptr, ptr0, len0);
  }
  get beta() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqrandomoracles_beta(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set beta(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqrandomoracles_beta(this.ptr, ptr0, len0);
  }
  get gamma() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqrandomoracles_gamma(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set gamma(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqrandomoracles_gamma(this.ptr, ptr0, len0);
  }
  get alpha_chal() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqrandomoracles_alpha_chal(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set alpha_chal(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqrandomoracles_alpha_chal(this.ptr, ptr0, len0);
  }
  get alpha() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqrandomoracles_alpha(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set alpha(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqrandomoracles_alpha(this.ptr, ptr0, len0);
  }
  get zeta() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqrandomoracles_zeta(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set zeta(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqrandomoracles_zeta(this.ptr, ptr0, len0);
  }
  get v() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqrandomoracles_v(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set v(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqrandomoracles_v(this.ptr, ptr0, len0);
  }
  get u() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqrandomoracles_u(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set u(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqrandomoracles_u(this.ptr, ptr0, len0);
  }
  get zeta_chal() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqrandomoracles_zeta_chal(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set zeta_chal(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqrandomoracles_zeta_chal(this.ptr, ptr0, len0);
  }
  get v_chal() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqrandomoracles_v_chal(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set v_chal(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqrandomoracles_v_chal(this.ptr, ptr0, len0);
  }
  get u_chal() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqrandomoracles_u_chal(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set u_chal(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqrandomoracles_u_chal(this.ptr, ptr0, len0);
  }
  constructor(joint_combiner_chal, joint_combiner, beta, gamma, alpha_chal, alpha, zeta, v, u, zeta_chal, v_chal, u_chal) {
    var ptr0 = passArray8ToWasm0(joint_combiner_chal, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(joint_combiner, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passArray8ToWasm0(beta, wasm.__wbindgen_malloc);
    var len2 = WASM_VECTOR_LEN;
    var ptr3 = passArray8ToWasm0(gamma, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArray8ToWasm0(alpha_chal, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    var ptr5 = passArray8ToWasm0(alpha, wasm.__wbindgen_malloc);
    var len5 = WASM_VECTOR_LEN;
    var ptr6 = passArray8ToWasm0(zeta, wasm.__wbindgen_malloc);
    var len6 = WASM_VECTOR_LEN;
    var ptr7 = passArray8ToWasm0(v, wasm.__wbindgen_malloc);
    var len7 = WASM_VECTOR_LEN;
    var ptr8 = passArray8ToWasm0(u, wasm.__wbindgen_malloc);
    var len8 = WASM_VECTOR_LEN;
    var ptr9 = passArray8ToWasm0(zeta_chal, wasm.__wbindgen_malloc);
    var len9 = WASM_VECTOR_LEN;
    var ptr10 = passArray8ToWasm0(v_chal, wasm.__wbindgen_malloc);
    var len10 = WASM_VECTOR_LEN;
    var ptr11 = passArray8ToWasm0(u_chal, wasm.__wbindgen_malloc);
    var len11 = WASM_VECTOR_LEN;
    var ret = wasm.wasmfqrandomoracles_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, ptr11, len11);
    return WasmFqRandomOracles.__wrap(ret);
  }
};
var WasmFqShifts = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqShifts.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqshifts_free(ptr);
  }
  get s0() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqdomain_group_gen(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s0(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqdomain_group_gen(this.ptr, ptr0, len0);
  }
  get s1() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqshifts_s1(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s1(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqshifts_s1(this.ptr, ptr0, len0);
  }
  get s2() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqshifts_s2(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s2(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqshifts_s2(this.ptr, ptr0, len0);
  }
  get s3() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqshifts_s3(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s3(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqshifts_s3(this.ptr, ptr0, len0);
  }
  get s4() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqshifts_s4(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s4(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqshifts_s4(this.ptr, ptr0, len0);
  }
  get s5() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqshifts_s5(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s5(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqshifts_s5(this.ptr, ptr0, len0);
  }
  get s6() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmfqshifts_s6(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set s6(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmfqshifts_s6(this.ptr, ptr0, len0);
  }
};
var WasmFqSrs = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmFqSrs.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmfqsrs_free(ptr);
  }
};
var WasmGPallas = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmGPallas.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmgpallas_free(ptr);
  }
  get x() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmgpallas_x(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set x(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmgpallas_x(this.ptr, ptr0, len0);
  }
  get y() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmgpallas_y(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set y(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmgpallas_y(this.ptr, ptr0, len0);
  }
  get infinity() {
    var ret = wasm.__wbg_get_wasmgpallas_infinity(this.ptr);
    return ret !== 0;
  }
  set infinity(arg0) {
    wasm.__wbg_set_wasmgpallas_infinity(this.ptr, arg0);
  }
};
var WasmGVesta = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmGVesta.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmgvesta_free(ptr);
  }
  get x() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmgvesta_x(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set x(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmgvesta_x(this.ptr, ptr0, len0);
  }
  get y() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_wasmgvesta_y(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set y(arg0) {
    var ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_wasmgvesta_y(this.ptr, ptr0, len0);
  }
  get infinity() {
    var ret = wasm.__wbg_get_wasmgpallas_infinity(this.ptr);
    return ret !== 0;
  }
  set infinity(arg0) {
    wasm.__wbg_set_wasmgpallas_infinity(this.ptr, arg0);
  }
};
var WasmGateWires = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmGateWires.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmgatewires_free(ptr);
  }
  get 0() {
    var ret = wasm.__wbg_get_wasmgatewires_0(this.ptr);
    return Wire.__wrap(ret);
  }
  set 0(arg0) {
    _assertClass(arg0, Wire);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmgatewires_0(this.ptr, ptr0);
  }
  get 1() {
    var ret = wasm.__wbg_get_wasmgatewires_1(this.ptr);
    return Wire.__wrap(ret);
  }
  set 1(arg0) {
    _assertClass(arg0, Wire);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmgatewires_1(this.ptr, ptr0);
  }
  get 2() {
    var ret = wasm.__wbg_get_wasmgatewires_2(this.ptr);
    return Wire.__wrap(ret);
  }
  set 2(arg0) {
    _assertClass(arg0, Wire);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmgatewires_2(this.ptr, ptr0);
  }
  get 3() {
    var ret = wasm.__wbg_get_wasmgatewires_3(this.ptr);
    return Wire.__wrap(ret);
  }
  set 3(arg0) {
    _assertClass(arg0, Wire);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmgatewires_3(this.ptr, ptr0);
  }
  get 4() {
    var ret = wasm.__wbg_get_wasmgatewires_4(this.ptr);
    return Wire.__wrap(ret);
  }
  set 4(arg0) {
    _assertClass(arg0, Wire);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmgatewires_4(this.ptr, ptr0);
  }
  get 5() {
    var ret = wasm.__wbg_get_wasmgatewires_5(this.ptr);
    return Wire.__wrap(ret);
  }
  set 5(arg0) {
    _assertClass(arg0, Wire);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmgatewires_5(this.ptr, ptr0);
  }
  get 6() {
    var ret = wasm.__wbg_get_wasmgatewires_6(this.ptr);
    return Wire.__wrap(ret);
  }
  set 6(arg0) {
    _assertClass(arg0, Wire);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmgatewires_6(this.ptr, ptr0);
  }
  constructor(w0, w1, w2, w3, w4, w5, w6) {
    _assertClass(w0, Wire);
    var ptr0 = w0.ptr;
    w0.ptr = 0;
    _assertClass(w1, Wire);
    var ptr1 = w1.ptr;
    w1.ptr = 0;
    _assertClass(w2, Wire);
    var ptr2 = w2.ptr;
    w2.ptr = 0;
    _assertClass(w3, Wire);
    var ptr3 = w3.ptr;
    w3.ptr = 0;
    _assertClass(w4, Wire);
    var ptr4 = w4.ptr;
    w4.ptr = 0;
    _assertClass(w5, Wire);
    var ptr5 = w5.ptr;
    w5.ptr = 0;
    _assertClass(w6, Wire);
    var ptr6 = w6.ptr;
    w6.ptr = 0;
    var ret = wasm.wasmgatewires_new(ptr0, ptr1, ptr2, ptr3, ptr4, ptr5, ptr6);
    return WasmGateWires.__wrap(ret);
  }
};
var WasmPallasGProjective = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPallasGProjective.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpallasgprojective_free(ptr);
  }
};
var WasmPastaFpPlonkIndex = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFpPlonkIndex.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafpplonkindex_free(ptr);
  }
};
var WasmPastaFqPlonkIndex = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmPastaFqPlonkIndex.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmpastafqplonkindex_free(ptr);
  }
};
var WasmVariable = class {
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmvariable_free(ptr);
  }
  get col() {
    var ret = wasm.__wbg_get_wasmvariable_col(this.ptr);
    return WasmColumn.__wrap(ret);
  }
  set col(arg0) {
    _assertClass(arg0, WasmColumn);
    var ptr0 = arg0.ptr;
    arg0.ptr = 0;
    wasm.__wbg_set_wasmvariable_col(this.ptr, ptr0);
  }
  get row() {
    var ret = wasm.__wbg_get_wasmvariable_row(this.ptr);
    return ret >>> 0;
  }
  set row(arg0) {
    wasm.__wbg_set_wasmvariable_row(this.ptr, arg0);
  }
};
var WasmVecVecFp = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmVecVecFp.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmvecvecfp_free(ptr);
  }
  constructor(n) {
    var ret = wasm.wasmvecvecfp_create(n);
    return WasmVecVecFp.__wrap(ret);
  }
  push(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmvecvecfp_push(this.ptr, ptr0, len0);
  }
  get(i) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmvecvecfp_get(retptr, this.ptr, i);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set(i, x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmvecvecfp_set(this.ptr, i, ptr0, len0);
  }
};
var WasmVecVecFpPolyComm = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmVecVecFpPolyComm.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmvecvecfppolycomm_free(ptr);
  }
  constructor(n) {
    var ret = wasm.wasmvecvecfp_create(n);
    return WasmVecVecFpPolyComm.__wrap(ret);
  }
  push(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmvecvecfppolycomm_push(this.ptr, ptr0, len0);
  }
};
var WasmVecVecFq = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmVecVecFq.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmvecvecfq_free(ptr);
  }
  constructor(n) {
    var ret = wasm.wasmvecvecfp_create(n);
    return WasmVecVecFq.__wrap(ret);
  }
  push(x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmvecvecfq_push(this.ptr, ptr0, len0);
  }
  get(i) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.wasmvecvecfq_get(retptr, this.ptr, i);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      var v0 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 1);
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set(i, x) {
    var ptr0 = passArray8ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmvecvecfq_set(this.ptr, i, ptr0, len0);
  }
};
var WasmVecVecFqPolyComm = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmVecVecFqPolyComm.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmvecvecfqpolycomm_free(ptr);
  }
  constructor(n) {
    var ret = wasm.wasmvecvecfp_create(n);
    return WasmVecVecFqPolyComm.__wrap(ret);
  }
  push(x) {
    var ptr0 = passArray32ToWasm0(x, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmvecvecfqpolycomm_push(this.ptr, ptr0, len0);
  }
};
var WasmVestaGProjective = class {
  static __wrap(ptr) {
    const obj = Object.create(WasmVestaGProjective.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmvestagprojective_free(ptr);
  }
};
var Wire = class {
  static __wrap(ptr) {
    const obj = Object.create(Wire.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wire_free(ptr);
  }
  get row() {
    var ret = wasm.__wbg_get_wire_row(this.ptr);
    return ret >>> 0;
  }
  set row(arg0) {
    wasm.__wbg_set_wire_row(this.ptr, arg0);
  }
  get col() {
    var ret = wasm.__wbg_get_wire_col(this.ptr);
    return ret >>> 0;
  }
  set col(arg0) {
    wasm.__wbg_set_wire_col(this.ptr, arg0);
  }
  static create(row, col) {
    var ret = wasm.wire_create(row, col);
    return Wire.__wrap(ret);
  }
};
var wbg_rayon_PoolBuilder = class {
  static __wrap(ptr) {
    const obj = Object.create(wbg_rayon_PoolBuilder.prototype);
    obj.ptr = ptr;
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wbg_rayon_poolbuilder_free(ptr);
  }
  mainJS() {
    var ret = wasm.wbg_rayon_poolbuilder_mainJS(this.ptr);
    return takeObject(ret);
  }
  numThreads() {
    var ret = wasm.wbg_rayon_poolbuilder_numThreads(this.ptr);
    return ret >>> 0;
  }
  receiver() {
    var ret = wasm.wbg_rayon_poolbuilder_receiver(this.ptr);
    return ret;
  }
  build() {
    wasm.wbg_rayon_poolbuilder_build(this.ptr);
  }
};
async function load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}
async function init(input, maybe_memory) {
  if (typeof input === "undefined") {
    input = plonk_wasm_bg_default;
  }
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg_log_19fef73d9a645b72 = function(arg0, arg1) {
    console.log(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_alert_b014848fc9035c81 = function(arg0, arg1) {
    alert(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
  };
  imports.wbg.__wbg_randomFillSync_64cc7d048f228ca8 = function() {
    return handleError(function(arg0, arg1, arg2) {
      getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
    }, arguments);
  };
  imports.wbg.__wbg_getRandomValues_98117e9a7e993920 = function() {
    return handleError(function(arg0, arg1) {
      getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments);
  };
  imports.wbg.__wbg_process_2f24d6544ea7b200 = function(arg0) {
    var ret = getObject(arg0).process;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_is_object = function(arg0) {
    const val = getObject(arg0);
    var ret = typeof val === "object" && val !== null;
    return ret;
  };
  imports.wbg.__wbg_versions_6164651e75405d4a = function(arg0) {
    var ret = getObject(arg0).versions;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_node_4b517d861cbcb3bc = function(arg0) {
    var ret = getObject(arg0).node;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_is_string = function(arg0) {
    var ret = typeof getObject(arg0) === "string";
    return ret;
  };
  imports.wbg.__wbg_modulerequire_3440a4bcf44437db = function() {
    return handleError(function(arg0, arg1) {
      var ret = module.require(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_crypto_98fc271021c7d2ad = function(arg0) {
    var ret = getObject(arg0).crypto;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_msCrypto_a2cdb043d2bfe57f = function(arg0) {
    var ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newnoargs_be86524d73f67598 = function(arg0, arg1) {
    var ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_call_888d259a5fefc347 = function() {
    return handleError(function(arg0, arg1) {
      var ret = getObject(arg0).call(getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
    var ret = getObject(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_self_c6fbdfc2918d5e58 = function() {
    return handleError(function() {
      var ret = self.self;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_window_baec038b5ab35c54 = function() {
    return handleError(function() {
      var ret = window.window;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_globalThis_3f735a5746d41fbd = function() {
    return handleError(function() {
      var ret = globalThis.globalThis;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_global_1bc0b39582740e95 = function() {
    return handleError(function() {
      var ret = global.global;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbindgen_is_undefined = function(arg0) {
    var ret = getObject(arg0) === void 0;
    return ret;
  };
  imports.wbg.__wbg_buffer_397eaa4d72ee94dd = function(arg0) {
    var ret = getObject(arg0).buffer;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_a7ce447f15ff496f = function(arg0) {
    var ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_set_969ad0a60e51d320 = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
  };
  imports.wbg.__wbg_length_1eb8fc608a0d4cdb = function(arg0) {
    var ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_newwithlength_929232475839a482 = function(arg0) {
    var ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_subarray_8b658422a224f479 = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbindgen_rethrow = function(arg0) {
    throw takeObject(arg0);
  };
  imports.wbg.__wbindgen_module = function() {
    var ret = init.__wbindgen_wasm_module;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_memory = function() {
    var ret = wasm.memory;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_static_accessor_URL_b24f10c24510da94 = function() {
    var ret = CDN_LOCATION;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_startWorkers_3e6644f7fc0ac450 = function(arg0, arg1, arg2) {
    var ret = startWorkers(takeObject(arg0), takeObject(arg1), wbg_rayon_PoolBuilder.__wrap(arg2));
    return addHeapObject(ret);
  };
  if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) {
    input = fetch(input);
  }
  imports.wbg.memory = maybe_memory || new WebAssembly.Memory({ initial: 18, maximum: 16384, shared: true });
  const { instance, module } = await load(await input, imports);
  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;
  wasm.__wbindgen_start();
  return wasm;
}
var plonk_wasm_esbuild_default = init;