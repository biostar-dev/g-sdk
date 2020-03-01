using System;
using System.Threading;
using Connect;
using Grpc.Core;

namespace example
{
    class ConnectTest
    {
        private const string CA_FILE = "../../../../cert/ca.crt";

        private const string SERVER_ADDR = "192.168.0.2";
        private const int SERVER_PORT = 4000;

        private const int STATUS_QUEUE_SIZE = 16;

        private GrpcClient grpcClient;
        private ConnectSvc connectSvc;

        public ConnectSvc GetConnectSvc() {
            return connectSvc;
        }

        public ConnectTest(GrpcClient client) {
            grpcClient = client;

            connectSvc = new ConnectSvc(grpcClient.GetChannel());
        }

        public CancellationTokenSource SubscribeDeviceStatus() {
            var devStatusStream = connectSvc.Subscribe(STATUS_QUEUE_SIZE);
        
            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();

            ReceiveStatus(devStatusStream, cancellationTokenSource.Token);

            return cancellationTokenSource;
        }

        public static void Main(string[] args)
        {
            var grpcClient = new GrpcClient();
            grpcClient.Connect(CA_FILE, SERVER_ADDR, SERVER_PORT);

            var connectTest = new ConnectTest(grpcClient);

            var tokenSource = connectTest.SubscribeDeviceStatus();

            MainMenu mainMenu = new MainMenu(connectTest.GetConnectSvc());
            mainMenu.Show();

            tokenSource.Cancel();
            grpcClient.Close();
        }

        static async void ReceiveStatus(IAsyncStreamReader<StatusChange> stream, CancellationToken token) {
            Console.WriteLine("Start receiving device status");

            try {
                while(await stream.MoveNext(token)) {
                    var statusChange = stream.Current;
                    if(statusChange.Status != Connect.Status.TlsNotAllowed && statusChange.Status != Connect.Status.TcpNotAllowed) {
                        Console.WriteLine("\n\nStatus: {0}\n", statusChange);        
                    }
                }
            } catch (Exception e) {
                Console.WriteLine("Monitoring error: {0}", e);
            } finally {
                Console.WriteLine("Stop receiving device status");
            }
        }
    }
    
}
