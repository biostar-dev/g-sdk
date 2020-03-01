package com.supremainc.sdk.example;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.netty.NettyChannelBuilder;
import io.grpc.netty.GrpcSslContexts;
import io.grpc.StatusRuntimeException;

import java.awt.image.BufferedImage;
import java.awt.image.WritableRaster;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.supremainc.sdk.device.DeviceGrpc;
import com.supremainc.sdk.device.GetDeviceListRequest;
import com.supremainc.sdk.device.GetDeviceListResponse;

import com.supremainc.sdk.user.UserGrpc;
import com.supremainc.sdk.user.ScanFingerRequest;
import com.supremainc.sdk.user.ScanFingerResponse;
import com.supremainc.sdk.user.GetFingerImageRequest;
import com.supremainc.sdk.user.GetFingerImageResponse;

import java.io.FileOutputStream;
import java.awt.image.DataBufferByte;
import javax.imageio.ImageIO;
import javax.net.ssl.SSLException;

import java.io.File;

public class TestDevice {
  private static final Logger logger = Logger.getLogger(TestDevice.class.getName());

  private final ManagedChannel channel;
  private final DeviceGrpc.DeviceBlockingStub deviceStub;
  private final UserGrpc.UserBlockingStub userStub;

  /** Construct client connecting to HelloWorld server at {@code host:port}. */
  public TestDevice(String host, int port) throws Exception {
/*    this(ManagedChannelBuilder.forAddress(host, port)
        // Channels are secure by default (via SSL/TLS). For the example we disable TLS to avoid
        // needing certificates.
        .usePlaintext()
        .build()); */
    this.channel = NettyChannelBuilder.forAddress(host, port)
    .sslContext(GrpcSslContexts.forClient().trustManager(new File("../cert/ca.crt")).build())
    .build();

    deviceStub = DeviceGrpc.newBlockingStub(this.channel);
    userStub = UserGrpc.newBlockingStub(this.channel);        
  }

  /** Construct client for accessing the server using the existing channel. */
  TestDevice(ManagedChannel channel) {
    this.channel = channel;
    deviceStub = DeviceGrpc.newBlockingStub(channel);
    userStub = UserGrpc.newBlockingStub(channel);
  }

  public void shutdown() throws InterruptedException {
    channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
  }

  public void getDeviceList() {
    logger.info("Will try to get the device list...");
    GetDeviceListRequest request = GetDeviceListRequest.newBuilder().build();
    GetDeviceListResponse response;
    try {
      response = deviceStub.getDeviceList(request);
    } catch (StatusRuntimeException e) {
      logger.log(Level.WARNING, "RPC failed: {0}", e.getStatus());
      return;
    }
    
    logger.info("Device List: " + response.toString());

    ScanFingerRequest scanRequest = ScanFingerRequest.newBuilder().setDeviceID(response.getDeviceID(0)).build();
    ScanFingerResponse scanResponse;

    try {
      scanResponse = userStub.scanFinger(scanRequest);
    } catch (StatusRuntimeException e) {
      logger.log(Level.WARNING, "RPC failed: {0}", e.getStatus());
      return;
    }

    logger.info(String.format("Template: %d", scanResponse.getTemplateData().size()));

    GetFingerImageRequest imageRequest = GetFingerImageRequest.newBuilder().setDeviceID(response.getDeviceID(0)).build();
    GetFingerImageResponse imageResponse;

    try {
      imageResponse = userStub.getFingerImage(imageRequest);
    } catch (StatusRuntimeException e) {
      logger.log(Level.WARNING, "RPC failed: {0}", e.getStatus());
      return;
    }
    
    logger.info(String.format("Finger Image: (%d %d) %d bytes", imageResponse.getWidth(), imageResponse.getHeight(), imageResponse.getGrayPixel().size()));

    try {
      BufferedImage bmpImage = new BufferedImage(imageResponse.getWidth(), imageResponse.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
      byte[] imageData = ((DataBufferByte)bmpImage.getRaster().getDataBuffer()).getData();
      System.arraycopy(imageResponse.getGrayPixel().toByteArray(), 0, imageData, 0, imageData.length);

      FileOutputStream bmpFile = new FileOutputStream("./finger.bmp");
      ImageIO.write(bmpImage, "BMP", bmpFile);
      bmpFile.close();
    } catch (Exception e) {
      logger.log(Level.WARNING, "Cannot save the bmp file: {0}", e.toString());
      return;     
    }

  }

  public static void main(String[] args) throws Exception {
    int port = 4000;

    if(args.length > 0) {
      port = Integer.parseInt(args[0]);
    }

    TestDevice client = new TestDevice("localhost", port);

    try {
      client.getDeviceList();
    } finally {
      client.shutdown();
    }
  }
}
