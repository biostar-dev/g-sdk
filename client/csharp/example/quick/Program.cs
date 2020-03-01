using System;
using Connect;
using Grpc.Core;

namespace example
{
    class QuickStart
    {
        private const string CA_FILE = "../../../cert/ca.crt";

        private const string SERVER_ADDR = "192.168.0.2";
        private const int SERVER_PORT = 4000;

        private const string DEVICE_ADDR = "192.168.0.110";
        private const int DEVICE_PORT = 51211;
        private const bool USE_SSL = false;

        private GrpcClient grpcClient;
        private ConnectSvc connectSvc;
        private DeviceSvc deviceSvc;
        private UserSvc userSvc;
        private FingerSvc fingerSvc;
        private CardSvc cardSvc;
        private EventSvc eventSvc;

        public QuickStart(GrpcClient client) {
            grpcClient = client;

            connectSvc = new ConnectSvc(grpcClient.GetChannel());
            deviceSvc = new DeviceSvc(grpcClient.GetChannel());
            userSvc = new UserSvc(grpcClient.GetChannel());
            fingerSvc = new FingerSvc(grpcClient.GetChannel());
            cardSvc = new CardSvc(grpcClient.GetChannel());
            eventSvc = new EventSvc(grpcClient.GetChannel());
        }

        public uint TestConnect() {
            var devList = connectSvc.GetDeviceList();

            Console.WriteLine("Device list before connection: {0}" + Environment.NewLine, devList);

            var connectInfo = new ConnectInfo{ IPAddr = DEVICE_ADDR, Port = DEVICE_PORT, UseSSL = USE_SSL };
            var devID = connectSvc.Connect(connectInfo);

            devList = connectSvc.GetDeviceList();

            Console.WriteLine("Device list after connection: {0}" + Environment.NewLine, devList);

            return devID;
        }

        public void TestDevice(uint deviceID) {
            var info = deviceSvc.GetInfo(deviceID);

            Console.WriteLine("Device info: {0}" + Environment.NewLine, info);

            var capInfo = deviceSvc.GetCapabilityInfo(deviceID);

            Console.WriteLine("Device capability info: {0}" + Environment.NewLine, capInfo);
        }

        public static void Main(string[] args)
        {
            try {
                var grpcClient = new GrpcClient();
                grpcClient.Connect(CA_FILE, SERVER_ADDR, SERVER_PORT);

                var quickStart = new QuickStart(grpcClient);

                var devID = quickStart.TestConnect();

                quickStart.TestDevice(devID);

                new FingerTest(quickStart.fingerSvc).Test(devID);
                new CardTest(quickStart.cardSvc).Test(devID); 

                new UserTest(quickStart.userSvc, quickStart.fingerSvc).Test(devID);

                new EventTest(quickStart.eventSvc).Test(devID);

                uint[] deviceIDs = { devID };
                quickStart.connectSvc.Disconnect(deviceIDs);
                grpcClient.Close();
            } catch (RpcException e) {
                Console.WriteLine("gRPC Error: {0}", e);
            }
        }
    }
}

