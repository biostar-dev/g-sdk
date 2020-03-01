package com.supremainc.sdk.example.quick;

import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

import com.supremainc.sdk.example.user.UserSvc;
import com.google.protobuf.ByteString;
import com.supremainc.sdk.example.finger.FingerSvc;
import com.supremainc.sdk.user.UserHdr;
import com.supremainc.sdk.user.UserInfo;
import com.supremainc.sdk.user.UserFinger;
import com.supremainc.sdk.finger.FingerData;
import com.supremainc.sdk.finger.TemplateFormat;

class UserTest {
  private static final int NUM_OF_NEW_USER = 3;
  private static final int QUALITY_THRESHOLD = 50;

  private UserSvc userSvc;
  private FingerSvc fingerSvc;

  public UserTest(UserSvc uSvc, FingerSvc fSvc) {
    userSvc = uSvc;
    fingerSvc = fSvc;
  }

  public void test(int deviceID) throws Exception {
    List<UserHdr> userHdrs = userSvc.getList(deviceID);

    System.out.printf("User list: \n%s\n\n", userHdrs);    

    List<String> userIDs = new ArrayList<String>();
    ListIterator<UserHdr> hdrIter = userHdrs.listIterator();

    while(hdrIter.hasNext()) {
      userIDs.add(hdrIter.next().getID());
    }

    List<UserInfo> userInfos = userSvc.getUser(deviceID, userIDs);
    ListIterator<UserInfo> userIter = userInfos.listIterator();

    while(userIter.hasNext()) {
      UserInfo info = userIter.next();
      System.out.printf("User: %s\n%s%s\n", info.getName(), info.getHdr(), info.getSetting());
    }

    List<UserInfo> newUsers = new ArrayList<UserInfo>();
    List<String> newUserIDs = new ArrayList<String>();

    for(int i = 0; i < NUM_OF_NEW_USER; i++) {
      UserHdr hdr = UserHdr.newBuilder().setID(String.format("%d", (int)(Math.random() * Integer.MAX_VALUE))).build();
      newUsers.add(UserInfo.newBuilder().setHdr(hdr).build());
      newUserIDs.add(hdr.getID());
    }

    userSvc.enroll(deviceID, newUsers);
    
    userHdrs = userSvc.getList(deviceID);
    System.out.printf("User list after enrolling new users: \n%s\n\n", userHdrs);    

    try {
      testFinger(deviceID, newUserIDs.get(0));
    } catch (Exception e) {
      System.out.printf("Cannot comlete the fingerprint test: %s", e); 
    }

    userSvc.delete(deviceID, newUserIDs);

    userHdrs = userSvc.getList(deviceID);
    System.out.printf("User list after deleting new users: \n%s\n\n", userHdrs);    
  }

  public void testFinger(int deviceID, String userID) throws Exception {
    List<String> userIDs = new ArrayList<String>();
    userIDs.add(userID);

    List<UserInfo> userInfos = userSvc.getUser(deviceID, userIDs);
    ListIterator<UserInfo> userIter = userInfos.listIterator();

    if(userIter.hasNext()) {
      System.out.printf("User without fingerprint:\n%s\n", userIter.next());
    }

    List<UserFinger> userFingers = new ArrayList<UserFinger>();
    
    System.out.printf(">>> Scan a finger for user %s\n", userID);
    byte[] firstTemplate = fingerSvc.scan(deviceID, TemplateFormat.TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD);

    System.out.printf(">>> Scan the same finger for user %s\n", userID);
    byte[] secondTemplate = fingerSvc.scan(deviceID, TemplateFormat.TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD);

    FingerData fingerData = FingerData.newBuilder().setIndex(0).setFlag(0).addTemplates(ByteString.copyFrom(firstTemplate)).addTemplates(ByteString.copyFrom(secondTemplate)).build();
    userFingers.add(UserFinger.newBuilder().setUserID(userID).addFingers(fingerData).build());

    userSvc.setFinger(deviceID, userFingers);

    userInfos = userSvc.getUser(deviceID, userIDs);
    userIter = userInfos.listIterator();

    if(userIter.hasNext()) {
      System.out.printf("User after adding fingerprints:\n%s\n", userIter.next());
    }
  }
}

