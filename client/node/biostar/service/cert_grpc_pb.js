// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var cert_pb = require('./cert_pb.js');

function serialize_cert_CreateCARequest(arg) {
  if (!(arg instanceof cert_pb.CreateCARequest)) {
    throw new Error('Expected argument of type cert.CreateCARequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cert_CreateCARequest(buffer_arg) {
  return cert_pb.CreateCARequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cert_CreateCAResponse(arg) {
  if (!(arg instanceof cert_pb.CreateCAResponse)) {
    throw new Error('Expected argument of type cert.CreateCAResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cert_CreateCAResponse(buffer_arg) {
  return cert_pb.CreateCAResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cert_CreateServerCertificateRequest(arg) {
  if (!(arg instanceof cert_pb.CreateServerCertificateRequest)) {
    throw new Error('Expected argument of type cert.CreateServerCertificateRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cert_CreateServerCertificateRequest(buffer_arg) {
  return cert_pb.CreateServerCertificateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cert_CreateServerCertificateResponse(arg) {
  if (!(arg instanceof cert_pb.CreateServerCertificateResponse)) {
    throw new Error('Expected argument of type cert.CreateServerCertificateResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cert_CreateServerCertificateResponse(buffer_arg) {
  return cert_pb.CreateServerCertificateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cert_GetCARequest(arg) {
  if (!(arg instanceof cert_pb.GetCARequest)) {
    throw new Error('Expected argument of type cert.GetCARequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cert_GetCARequest(buffer_arg) {
  return cert_pb.GetCARequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cert_GetCAResponse(arg) {
  if (!(arg instanceof cert_pb.GetCAResponse)) {
    throw new Error('Expected argument of type cert.GetCAResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cert_GetCAResponse(buffer_arg) {
  return cert_pb.GetCAResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cert_GetServerCertificateRequest(arg) {
  if (!(arg instanceof cert_pb.GetServerCertificateRequest)) {
    throw new Error('Expected argument of type cert.GetServerCertificateRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cert_GetServerCertificateRequest(buffer_arg) {
  return cert_pb.GetServerCertificateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cert_GetServerCertificateResponse(arg) {
  if (!(arg instanceof cert_pb.GetServerCertificateResponse)) {
    throw new Error('Expected argument of type cert.GetServerCertificateResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cert_GetServerCertificateResponse(buffer_arg) {
  return cert_pb.GetServerCertificateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cert_SetCARequest(arg) {
  if (!(arg instanceof cert_pb.SetCARequest)) {
    throw new Error('Expected argument of type cert.SetCARequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cert_SetCARequest(buffer_arg) {
  return cert_pb.SetCARequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cert_SetCAResponse(arg) {
  if (!(arg instanceof cert_pb.SetCAResponse)) {
    throw new Error('Expected argument of type cert.SetCAResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cert_SetCAResponse(buffer_arg) {
  return cert_pb.SetCAResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cert_SetServerCertificateRequest(arg) {
  if (!(arg instanceof cert_pb.SetServerCertificateRequest)) {
    throw new Error('Expected argument of type cert.SetServerCertificateRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cert_SetServerCertificateRequest(buffer_arg) {
  return cert_pb.SetServerCertificateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cert_SetServerCertificateResponse(arg) {
  if (!(arg instanceof cert_pb.SetServerCertificateResponse)) {
    throw new Error('Expected argument of type cert.SetServerCertificateResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cert_SetServerCertificateResponse(buffer_arg) {
  return cert_pb.SetServerCertificateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CertService = exports.CertService = {
  // Root CA
  createCA: {
    path: '/cert.Cert/CreateCA',
    requestStream: false,
    responseStream: false,
    requestType: cert_pb.CreateCARequest,
    responseType: cert_pb.CreateCAResponse,
    requestSerialize: serialize_cert_CreateCARequest,
    requestDeserialize: deserialize_cert_CreateCARequest,
    responseSerialize: serialize_cert_CreateCAResponse,
    responseDeserialize: deserialize_cert_CreateCAResponse,
  },
  setCA: {
    path: '/cert.Cert/SetCA',
    requestStream: false,
    responseStream: false,
    requestType: cert_pb.SetCARequest,
    responseType: cert_pb.SetCAResponse,
    requestSerialize: serialize_cert_SetCARequest,
    requestDeserialize: deserialize_cert_SetCARequest,
    responseSerialize: serialize_cert_SetCAResponse,
    responseDeserialize: deserialize_cert_SetCAResponse,
  },
  getCA: {
    path: '/cert.Cert/GetCA',
    requestStream: false,
    responseStream: false,
    requestType: cert_pb.GetCARequest,
    responseType: cert_pb.GetCAResponse,
    requestSerialize: serialize_cert_GetCARequest,
    requestDeserialize: deserialize_cert_GetCARequest,
    responseSerialize: serialize_cert_GetCAResponse,
    responseDeserialize: deserialize_cert_GetCAResponse,
  },
  // Server Certificate
  createServerCertificate: {
    path: '/cert.Cert/CreateServerCertificate',
    requestStream: false,
    responseStream: false,
    requestType: cert_pb.CreateServerCertificateRequest,
    responseType: cert_pb.CreateServerCertificateResponse,
    requestSerialize: serialize_cert_CreateServerCertificateRequest,
    requestDeserialize: deserialize_cert_CreateServerCertificateRequest,
    responseSerialize: serialize_cert_CreateServerCertificateResponse,
    responseDeserialize: deserialize_cert_CreateServerCertificateResponse,
  },
  setServerCertificate: {
    path: '/cert.Cert/SetServerCertificate',
    requestStream: false,
    responseStream: false,
    requestType: cert_pb.SetServerCertificateRequest,
    responseType: cert_pb.SetServerCertificateResponse,
    requestSerialize: serialize_cert_SetServerCertificateRequest,
    requestDeserialize: deserialize_cert_SetServerCertificateRequest,
    responseSerialize: serialize_cert_SetServerCertificateResponse,
    responseDeserialize: deserialize_cert_SetServerCertificateResponse,
  },
  getServerCertificate: {
    path: '/cert.Cert/GetServerCertificate',
    requestStream: false,
    responseStream: false,
    requestType: cert_pb.GetServerCertificateRequest,
    responseType: cert_pb.GetServerCertificateResponse,
    requestSerialize: serialize_cert_GetServerCertificateRequest,
    requestDeserialize: deserialize_cert_GetServerCertificateRequest,
    responseSerialize: serialize_cert_GetServerCertificateResponse,
    responseDeserialize: deserialize_cert_GetServerCertificateResponse,
  },
};

exports.CertClient = grpc.makeGenericClientConstructor(CertService);
