package com.supremainc.sdk.example.client;

import io.grpc.ManagedChannel;
import io.grpc.netty.NettyChannelBuilder;
import io.grpc.netty.GrpcSslContexts;

import java.util.concurrent.TimeUnit;

import java.io.File;

public class GrpcClient {
  private ManagedChannel channel;

  public ManagedChannel getChannel() {
    return channel;
  }

  public void connect(String certFile, String serverAddr, int serverPort) throws Exception {
    channel = NettyChannelBuilder.forAddress(serverAddr, serverPort)
    .sslContext(GrpcSslContexts.forClient().trustManager(new File(certFile)).build())
    .build();
  }

  public void close() throws InterruptedException {
    if(channel != null) {
      channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
      channel = null;
    }
  }
}

