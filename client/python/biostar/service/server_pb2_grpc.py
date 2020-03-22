# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
import grpc

import server_pb2 as server__pb2


class ServerStub(object):
  # missing associated documentation comment in .proto file
  pass

  def __init__(self, channel):
    """Constructor.

    Args:
      channel: A grpc.Channel.
    """
    self.GetList = channel.unary_unary(
        '/server.Server/GetList',
        request_serializer=server__pb2.GetListRequest.SerializeToString,
        response_deserializer=server__pb2.GetListResponse.FromString,
        )
    self.SubscribeStatus = channel.unary_stream(
        '/server.Server/SubscribeStatus',
        request_serializer=server__pb2.SubscribeStatusRequest.SerializeToString,
        response_deserializer=server__pb2.StatusChange.FromString,
        )


class ServerServicer(object):
  # missing associated documentation comment in .proto file
  pass

  def GetList(self, request, context):
    # missing associated documentation comment in .proto file
    pass
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')

  def SubscribeStatus(self, request, context):
    # missing associated documentation comment in .proto file
    pass
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')


def add_ServerServicer_to_server(servicer, server):
  rpc_method_handlers = {
      'GetList': grpc.unary_unary_rpc_method_handler(
          servicer.GetList,
          request_deserializer=server__pb2.GetListRequest.FromString,
          response_serializer=server__pb2.GetListResponse.SerializeToString,
      ),
      'SubscribeStatus': grpc.unary_stream_rpc_method_handler(
          servicer.SubscribeStatus,
          request_deserializer=server__pb2.SubscribeStatusRequest.FromString,
          response_serializer=server__pb2.StatusChange.SerializeToString,
      ),
  }
  generic_handler = grpc.method_handlers_generic_handler(
      'server.Server', rpc_method_handlers)
  server.add_generic_rpc_handlers((generic_handler,))