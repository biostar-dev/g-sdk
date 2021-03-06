// Code generated by protoc-gen-go. DO NOT EDIT.
// source: status.proto

package status

import (
	action "biostar/service/action"
	err "biostar/service/err"
	context "context"
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	grpc "google.golang.org/grpc"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type DeviceStatus int32

const (
	DeviceStatus_DEVICE_STATUS_NORMAL              DeviceStatus = 0
	DeviceStatus_DEVICE_STATUS_LOCKED              DeviceStatus = 1
	DeviceStatus_DEVICE_STATUS_RTC_ERROR           DeviceStatus = 2
	DeviceStatus_DEVICE_STATUS_WAITING_INPUT       DeviceStatus = 3
	DeviceStatus_DEVICE_STATUS_WAITING_DHCP        DeviceStatus = 4
	DeviceStatus_DEVICE_STATUS_SCAN_FINGER         DeviceStatus = 5
	DeviceStatus_DEVICE_STATUS_SCAN_CARD           DeviceStatus = 6
	DeviceStatus_DEVICE_STATUS_SUCCESS             DeviceStatus = 7
	DeviceStatus_DEVICE_STATUS_FAIL                DeviceStatus = 8
	DeviceStatus_DEVICE_STATUS_DURESS              DeviceStatus = 9
	DeviceStatus_DEVICE_STATUS_PROCESS_CONFIG_CARD DeviceStatus = 10
	DeviceStatus_DEVICE_STATUS_SUCCESS_CONFIG_CARD DeviceStatus = 11
	DeviceStatus_DEVICE_STATUS_RESERVED2           DeviceStatus = 12
	DeviceStatus_DEVICE_STATUS_RESERVED3           DeviceStatus = 13
	DeviceStatus_DEVICE_STATUS_RESERVED4           DeviceStatus = 14
)

var DeviceStatus_name = map[int32]string{
	0:  "DEVICE_STATUS_NORMAL",
	1:  "DEVICE_STATUS_LOCKED",
	2:  "DEVICE_STATUS_RTC_ERROR",
	3:  "DEVICE_STATUS_WAITING_INPUT",
	4:  "DEVICE_STATUS_WAITING_DHCP",
	5:  "DEVICE_STATUS_SCAN_FINGER",
	6:  "DEVICE_STATUS_SCAN_CARD",
	7:  "DEVICE_STATUS_SUCCESS",
	8:  "DEVICE_STATUS_FAIL",
	9:  "DEVICE_STATUS_DURESS",
	10: "DEVICE_STATUS_PROCESS_CONFIG_CARD",
	11: "DEVICE_STATUS_SUCCESS_CONFIG_CARD",
	12: "DEVICE_STATUS_RESERVED2",
	13: "DEVICE_STATUS_RESERVED3",
	14: "DEVICE_STATUS_RESERVED4",
}

var DeviceStatus_value = map[string]int32{
	"DEVICE_STATUS_NORMAL":              0,
	"DEVICE_STATUS_LOCKED":              1,
	"DEVICE_STATUS_RTC_ERROR":           2,
	"DEVICE_STATUS_WAITING_INPUT":       3,
	"DEVICE_STATUS_WAITING_DHCP":        4,
	"DEVICE_STATUS_SCAN_FINGER":         5,
	"DEVICE_STATUS_SCAN_CARD":           6,
	"DEVICE_STATUS_SUCCESS":             7,
	"DEVICE_STATUS_FAIL":                8,
	"DEVICE_STATUS_DURESS":              9,
	"DEVICE_STATUS_PROCESS_CONFIG_CARD": 10,
	"DEVICE_STATUS_SUCCESS_CONFIG_CARD": 11,
	"DEVICE_STATUS_RESERVED2":           12,
	"DEVICE_STATUS_RESERVED3":           13,
	"DEVICE_STATUS_RESERVED4":           14,
}

func (x DeviceStatus) String() string {
	return proto.EnumName(DeviceStatus_name, int32(x))
}

func (DeviceStatus) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_dfe4fce6682daf5b, []int{0}
}

type LEDStatus struct {
	DeviceStatus         DeviceStatus        `protobuf:"varint,1,opt,name=deviceStatus,proto3,enum=status.DeviceStatus" json:"deviceStatus,omitempty"`
	Count                uint32              `protobuf:"varint,2,opt,name=count,proto3" json:"count,omitempty"`
	Signals              []*action.LEDSignal `protobuf:"bytes,3,rep,name=signals,proto3" json:"signals,omitempty"`
	XXX_NoUnkeyedLiteral struct{}            `json:"-"`
	XXX_unrecognized     []byte              `json:"-"`
	XXX_sizecache        int32               `json:"-"`
}

func (m *LEDStatus) Reset()         { *m = LEDStatus{} }
func (m *LEDStatus) String() string { return proto.CompactTextString(m) }
func (*LEDStatus) ProtoMessage()    {}
func (*LEDStatus) Descriptor() ([]byte, []int) {
	return fileDescriptor_dfe4fce6682daf5b, []int{0}
}

func (m *LEDStatus) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_LEDStatus.Unmarshal(m, b)
}
func (m *LEDStatus) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_LEDStatus.Marshal(b, m, deterministic)
}
func (m *LEDStatus) XXX_Merge(src proto.Message) {
	xxx_messageInfo_LEDStatus.Merge(m, src)
}
func (m *LEDStatus) XXX_Size() int {
	return xxx_messageInfo_LEDStatus.Size(m)
}
func (m *LEDStatus) XXX_DiscardUnknown() {
	xxx_messageInfo_LEDStatus.DiscardUnknown(m)
}

var xxx_messageInfo_LEDStatus proto.InternalMessageInfo

func (m *LEDStatus) GetDeviceStatus() DeviceStatus {
	if m != nil {
		return m.DeviceStatus
	}
	return DeviceStatus_DEVICE_STATUS_NORMAL
}

func (m *LEDStatus) GetCount() uint32 {
	if m != nil {
		return m.Count
	}
	return 0
}

func (m *LEDStatus) GetSignals() []*action.LEDSignal {
	if m != nil {
		return m.Signals
	}
	return nil
}

type BuzzerStatus struct {
	DeviceStatus         DeviceStatus           `protobuf:"varint,1,opt,name=deviceStatus,proto3,enum=status.DeviceStatus" json:"deviceStatus,omitempty"`
	Count                uint32                 `protobuf:"varint,2,opt,name=count,proto3" json:"count,omitempty"`
	Signals              []*action.BuzzerSignal `protobuf:"bytes,3,rep,name=signals,proto3" json:"signals,omitempty"`
	XXX_NoUnkeyedLiteral struct{}               `json:"-"`
	XXX_unrecognized     []byte                 `json:"-"`
	XXX_sizecache        int32                  `json:"-"`
}

func (m *BuzzerStatus) Reset()         { *m = BuzzerStatus{} }
func (m *BuzzerStatus) String() string { return proto.CompactTextString(m) }
func (*BuzzerStatus) ProtoMessage()    {}
func (*BuzzerStatus) Descriptor() ([]byte, []int) {
	return fileDescriptor_dfe4fce6682daf5b, []int{1}
}

func (m *BuzzerStatus) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_BuzzerStatus.Unmarshal(m, b)
}
func (m *BuzzerStatus) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_BuzzerStatus.Marshal(b, m, deterministic)
}
func (m *BuzzerStatus) XXX_Merge(src proto.Message) {
	xxx_messageInfo_BuzzerStatus.Merge(m, src)
}
func (m *BuzzerStatus) XXX_Size() int {
	return xxx_messageInfo_BuzzerStatus.Size(m)
}
func (m *BuzzerStatus) XXX_DiscardUnknown() {
	xxx_messageInfo_BuzzerStatus.DiscardUnknown(m)
}

var xxx_messageInfo_BuzzerStatus proto.InternalMessageInfo

func (m *BuzzerStatus) GetDeviceStatus() DeviceStatus {
	if m != nil {
		return m.DeviceStatus
	}
	return DeviceStatus_DEVICE_STATUS_NORMAL
}

func (m *BuzzerStatus) GetCount() uint32 {
	if m != nil {
		return m.Count
	}
	return 0
}

func (m *BuzzerStatus) GetSignals() []*action.BuzzerSignal {
	if m != nil {
		return m.Signals
	}
	return nil
}

type StatusConfig struct {
	LEDState             []*LEDStatus    `protobuf:"bytes,1,rep,name=LEDState,proto3" json:"LEDState,omitempty"`
	BuzzerState          []*BuzzerStatus `protobuf:"bytes,2,rep,name=BuzzerState,proto3" json:"BuzzerState,omitempty"`
	XXX_NoUnkeyedLiteral struct{}        `json:"-"`
	XXX_unrecognized     []byte          `json:"-"`
	XXX_sizecache        int32           `json:"-"`
}

func (m *StatusConfig) Reset()         { *m = StatusConfig{} }
func (m *StatusConfig) String() string { return proto.CompactTextString(m) }
func (*StatusConfig) ProtoMessage()    {}
func (*StatusConfig) Descriptor() ([]byte, []int) {
	return fileDescriptor_dfe4fce6682daf5b, []int{2}
}

func (m *StatusConfig) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_StatusConfig.Unmarshal(m, b)
}
func (m *StatusConfig) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_StatusConfig.Marshal(b, m, deterministic)
}
func (m *StatusConfig) XXX_Merge(src proto.Message) {
	xxx_messageInfo_StatusConfig.Merge(m, src)
}
func (m *StatusConfig) XXX_Size() int {
	return xxx_messageInfo_StatusConfig.Size(m)
}
func (m *StatusConfig) XXX_DiscardUnknown() {
	xxx_messageInfo_StatusConfig.DiscardUnknown(m)
}

var xxx_messageInfo_StatusConfig proto.InternalMessageInfo

func (m *StatusConfig) GetLEDState() []*LEDStatus {
	if m != nil {
		return m.LEDState
	}
	return nil
}

func (m *StatusConfig) GetBuzzerState() []*BuzzerStatus {
	if m != nil {
		return m.BuzzerState
	}
	return nil
}

type GetConfigRequest struct {
	DeviceID             uint32   `protobuf:"varint,1,opt,name=deviceID,proto3" json:"deviceID,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *GetConfigRequest) Reset()         { *m = GetConfigRequest{} }
func (m *GetConfigRequest) String() string { return proto.CompactTextString(m) }
func (*GetConfigRequest) ProtoMessage()    {}
func (*GetConfigRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_dfe4fce6682daf5b, []int{3}
}

func (m *GetConfigRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetConfigRequest.Unmarshal(m, b)
}
func (m *GetConfigRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetConfigRequest.Marshal(b, m, deterministic)
}
func (m *GetConfigRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetConfigRequest.Merge(m, src)
}
func (m *GetConfigRequest) XXX_Size() int {
	return xxx_messageInfo_GetConfigRequest.Size(m)
}
func (m *GetConfigRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_GetConfigRequest.DiscardUnknown(m)
}

var xxx_messageInfo_GetConfigRequest proto.InternalMessageInfo

func (m *GetConfigRequest) GetDeviceID() uint32 {
	if m != nil {
		return m.DeviceID
	}
	return 0
}

type GetConfigResponse struct {
	Config               *StatusConfig `protobuf:"bytes,1,opt,name=config,proto3" json:"config,omitempty"`
	XXX_NoUnkeyedLiteral struct{}      `json:"-"`
	XXX_unrecognized     []byte        `json:"-"`
	XXX_sizecache        int32         `json:"-"`
}

func (m *GetConfigResponse) Reset()         { *m = GetConfigResponse{} }
func (m *GetConfigResponse) String() string { return proto.CompactTextString(m) }
func (*GetConfigResponse) ProtoMessage()    {}
func (*GetConfigResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_dfe4fce6682daf5b, []int{4}
}

func (m *GetConfigResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetConfigResponse.Unmarshal(m, b)
}
func (m *GetConfigResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetConfigResponse.Marshal(b, m, deterministic)
}
func (m *GetConfigResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetConfigResponse.Merge(m, src)
}
func (m *GetConfigResponse) XXX_Size() int {
	return xxx_messageInfo_GetConfigResponse.Size(m)
}
func (m *GetConfigResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_GetConfigResponse.DiscardUnknown(m)
}

var xxx_messageInfo_GetConfigResponse proto.InternalMessageInfo

func (m *GetConfigResponse) GetConfig() *StatusConfig {
	if m != nil {
		return m.Config
	}
	return nil
}

type SetConfigRequest struct {
	DeviceID             uint32        `protobuf:"varint,1,opt,name=deviceID,proto3" json:"deviceID,omitempty"`
	Config               *StatusConfig `protobuf:"bytes,2,opt,name=config,proto3" json:"config,omitempty"`
	XXX_NoUnkeyedLiteral struct{}      `json:"-"`
	XXX_unrecognized     []byte        `json:"-"`
	XXX_sizecache        int32         `json:"-"`
}

func (m *SetConfigRequest) Reset()         { *m = SetConfigRequest{} }
func (m *SetConfigRequest) String() string { return proto.CompactTextString(m) }
func (*SetConfigRequest) ProtoMessage()    {}
func (*SetConfigRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_dfe4fce6682daf5b, []int{5}
}

func (m *SetConfigRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_SetConfigRequest.Unmarshal(m, b)
}
func (m *SetConfigRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_SetConfigRequest.Marshal(b, m, deterministic)
}
func (m *SetConfigRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_SetConfigRequest.Merge(m, src)
}
func (m *SetConfigRequest) XXX_Size() int {
	return xxx_messageInfo_SetConfigRequest.Size(m)
}
func (m *SetConfigRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_SetConfigRequest.DiscardUnknown(m)
}

var xxx_messageInfo_SetConfigRequest proto.InternalMessageInfo

func (m *SetConfigRequest) GetDeviceID() uint32 {
	if m != nil {
		return m.DeviceID
	}
	return 0
}

func (m *SetConfigRequest) GetConfig() *StatusConfig {
	if m != nil {
		return m.Config
	}
	return nil
}

type SetConfigResponse struct {
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *SetConfigResponse) Reset()         { *m = SetConfigResponse{} }
func (m *SetConfigResponse) String() string { return proto.CompactTextString(m) }
func (*SetConfigResponse) ProtoMessage()    {}
func (*SetConfigResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_dfe4fce6682daf5b, []int{6}
}

func (m *SetConfigResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_SetConfigResponse.Unmarshal(m, b)
}
func (m *SetConfigResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_SetConfigResponse.Marshal(b, m, deterministic)
}
func (m *SetConfigResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_SetConfigResponse.Merge(m, src)
}
func (m *SetConfigResponse) XXX_Size() int {
	return xxx_messageInfo_SetConfigResponse.Size(m)
}
func (m *SetConfigResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_SetConfigResponse.DiscardUnknown(m)
}

var xxx_messageInfo_SetConfigResponse proto.InternalMessageInfo

type SetConfigMultiRequest struct {
	DeviceIDs            []uint32      `protobuf:"varint,1,rep,packed,name=deviceIDs,proto3" json:"deviceIDs,omitempty"`
	Config               *StatusConfig `protobuf:"bytes,2,opt,name=config,proto3" json:"config,omitempty"`
	XXX_NoUnkeyedLiteral struct{}      `json:"-"`
	XXX_unrecognized     []byte        `json:"-"`
	XXX_sizecache        int32         `json:"-"`
}

func (m *SetConfigMultiRequest) Reset()         { *m = SetConfigMultiRequest{} }
func (m *SetConfigMultiRequest) String() string { return proto.CompactTextString(m) }
func (*SetConfigMultiRequest) ProtoMessage()    {}
func (*SetConfigMultiRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_dfe4fce6682daf5b, []int{7}
}

func (m *SetConfigMultiRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_SetConfigMultiRequest.Unmarshal(m, b)
}
func (m *SetConfigMultiRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_SetConfigMultiRequest.Marshal(b, m, deterministic)
}
func (m *SetConfigMultiRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_SetConfigMultiRequest.Merge(m, src)
}
func (m *SetConfigMultiRequest) XXX_Size() int {
	return xxx_messageInfo_SetConfigMultiRequest.Size(m)
}
func (m *SetConfigMultiRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_SetConfigMultiRequest.DiscardUnknown(m)
}

var xxx_messageInfo_SetConfigMultiRequest proto.InternalMessageInfo

func (m *SetConfigMultiRequest) GetDeviceIDs() []uint32 {
	if m != nil {
		return m.DeviceIDs
	}
	return nil
}

func (m *SetConfigMultiRequest) GetConfig() *StatusConfig {
	if m != nil {
		return m.Config
	}
	return nil
}

type SetConfigMultiResponse struct {
	DeviceErrors         []*err.ErrorResponse `protobuf:"bytes,1,rep,name=deviceErrors,proto3" json:"deviceErrors,omitempty"`
	XXX_NoUnkeyedLiteral struct{}             `json:"-"`
	XXX_unrecognized     []byte               `json:"-"`
	XXX_sizecache        int32                `json:"-"`
}

func (m *SetConfigMultiResponse) Reset()         { *m = SetConfigMultiResponse{} }
func (m *SetConfigMultiResponse) String() string { return proto.CompactTextString(m) }
func (*SetConfigMultiResponse) ProtoMessage()    {}
func (*SetConfigMultiResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_dfe4fce6682daf5b, []int{8}
}

func (m *SetConfigMultiResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_SetConfigMultiResponse.Unmarshal(m, b)
}
func (m *SetConfigMultiResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_SetConfigMultiResponse.Marshal(b, m, deterministic)
}
func (m *SetConfigMultiResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_SetConfigMultiResponse.Merge(m, src)
}
func (m *SetConfigMultiResponse) XXX_Size() int {
	return xxx_messageInfo_SetConfigMultiResponse.Size(m)
}
func (m *SetConfigMultiResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_SetConfigMultiResponse.DiscardUnknown(m)
}

var xxx_messageInfo_SetConfigMultiResponse proto.InternalMessageInfo

func (m *SetConfigMultiResponse) GetDeviceErrors() []*err.ErrorResponse {
	if m != nil {
		return m.DeviceErrors
	}
	return nil
}

func init() {
	proto.RegisterEnum("status.DeviceStatus", DeviceStatus_name, DeviceStatus_value)
	proto.RegisterType((*LEDStatus)(nil), "status.LEDStatus")
	proto.RegisterType((*BuzzerStatus)(nil), "status.BuzzerStatus")
	proto.RegisterType((*StatusConfig)(nil), "status.StatusConfig")
	proto.RegisterType((*GetConfigRequest)(nil), "status.GetConfigRequest")
	proto.RegisterType((*GetConfigResponse)(nil), "status.GetConfigResponse")
	proto.RegisterType((*SetConfigRequest)(nil), "status.SetConfigRequest")
	proto.RegisterType((*SetConfigResponse)(nil), "status.SetConfigResponse")
	proto.RegisterType((*SetConfigMultiRequest)(nil), "status.SetConfigMultiRequest")
	proto.RegisterType((*SetConfigMultiResponse)(nil), "status.SetConfigMultiResponse")
}

func init() { proto.RegisterFile("status.proto", fileDescriptor_dfe4fce6682daf5b) }

var fileDescriptor_dfe4fce6682daf5b = []byte{
	// 631 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xb4, 0x55, 0xdd, 0x4e, 0xdb, 0x4c,
	0x10, 0xfd, 0x9c, 0x7c, 0x04, 0x32, 0x38, 0x68, 0xd9, 0x06, 0xea, 0x84, 0x42, 0x69, 0xa4, 0x4a,
	0xa8, 0x3f, 0x46, 0x0a, 0x2d, 0xea, 0x25, 0xc6, 0x36, 0xa9, 0xd5, 0x60, 0x47, 0xeb, 0x84, 0x4a,
	0x55, 0x25, 0x2b, 0x98, 0x2d, 0xb2, 0x0a, 0x36, 0xf5, 0xda, 0xbd, 0xe0, 0x09, 0x7a, 0xd5, 0x47,
	0xeb, 0x1b, 0xf4, 0x5d, 0xaa, 0xd8, 0xeb, 0xe0, 0x1f, 0x22, 0x95, 0x8b, 0xde, 0x65, 0xe6, 0x9c,
	0x3d, 0x67, 0x66, 0x3c, 0xa3, 0x80, 0xc8, 0xa2, 0x69, 0x14, 0x33, 0xf9, 0x26, 0x0c, 0xa2, 0x00,
	0x37, 0xd2, 0xa8, 0x2b, 0x4e, 0xdd, 0xc8, 0x0b, 0xfc, 0x34, 0xdb, 0x6d, 0xd2, 0x30, 0x4c, 0x7f,
	0xf6, 0x7e, 0x08, 0xd0, 0x1c, 0xea, 0x9a, 0x9d, 0xd0, 0xf0, 0x3b, 0x10, 0x2f, 0xe8, 0x77, 0xcf,
	0xa5, 0x69, 0x2c, 0x09, 0xbb, 0xc2, 0xde, 0x5a, 0xbf, 0x2d, 0x73, 0x4d, 0x2d, 0x87, 0x91, 0x02,
	0x13, 0xb7, 0x61, 0xc9, 0x0d, 0x62, 0x3f, 0x92, 0x6a, 0xbb, 0xc2, 0x5e, 0x8b, 0xa4, 0x01, 0x7e,
	0x09, 0xcb, 0xcc, 0xbb, 0xf4, 0xa7, 0x57, 0x4c, 0xaa, 0xef, 0xd6, 0xf7, 0x56, 0xfb, 0xeb, 0x32,
	0x2f, 0x64, 0xe6, 0x99, 0x20, 0x24, 0x63, 0xf4, 0x7e, 0x0a, 0x20, 0x1e, 0xc7, 0xb7, 0xb7, 0x34,
	0xfc, 0x47, 0xd5, 0xc8, 0xe5, 0x6a, 0xda, 0x59, 0x35, 0xdc, 0xb6, 0x54, 0x50, 0x0c, 0x62, 0xaa,
	0xa7, 0x06, 0xfe, 0x17, 0xef, 0x12, 0xbf, 0x86, 0x15, 0x3e, 0x2a, 0x2a, 0x09, 0xbc, 0x1d, 0x5e,
	0xcb, 0x7c, 0x84, 0x64, 0x4e, 0xc1, 0x87, 0xb0, 0x7a, 0xd7, 0x0e, 0x95, 0x6a, 0xdc, 0x92, 0xbf,
	0xc8, 0x77, 0x4a, 0xf2, 0xc4, 0x9e, 0x0c, 0x68, 0x40, 0xa3, 0xd4, 0x93, 0xd0, 0x6f, 0x31, 0x65,
	0x11, 0xee, 0xc2, 0x4a, 0xda, 0xa0, 0xa1, 0x25, 0x63, 0x68, 0x91, 0x79, 0xdc, 0x53, 0x60, 0x3d,
	0xc7, 0x67, 0x37, 0x81, 0xcf, 0x28, 0x7e, 0x05, 0x0d, 0x37, 0xc9, 0x24, 0xf4, 0x9c, 0x6f, 0xbe,
	0x23, 0xc2, 0x39, 0xbd, 0xcf, 0x80, 0xec, 0x07, 0x58, 0xe6, 0xd4, 0x6b, 0x7f, 0xa1, 0xfe, 0x08,
	0xd6, 0xed, 0x72, 0x81, 0x3d, 0x17, 0x36, 0xe6, 0xc9, 0xd3, 0xf8, 0x2a, 0xf2, 0x32, 0xdf, 0x27,
	0xd0, 0xcc, 0x7c, 0x58, 0x32, 0xe6, 0x16, 0xb9, 0x4b, 0x3c, 0xd0, 0x79, 0x04, 0x9b, 0x65, 0x13,
	0x3e, 0x9f, 0xc3, 0x6c, 0xb7, 0xf4, 0x30, 0x0c, 0x42, 0xc6, 0xbf, 0x27, 0x96, 0x67, 0x97, 0x91,
	0xa4, 0x32, 0x26, 0x29, 0xf0, 0x5e, 0xfc, 0xaa, 0x83, 0x98, 0x5f, 0x3c, 0x2c, 0x41, 0x5b, 0xd3,
	0xcf, 0x0c, 0x55, 0x77, 0xec, 0xb1, 0x32, 0x9e, 0xd8, 0x8e, 0x69, 0x91, 0x53, 0x65, 0x88, 0xfe,
	0xab, 0x22, 0x43, 0x4b, 0xfd, 0xa0, 0x6b, 0x48, 0xc0, 0x5b, 0xf0, 0xb8, 0x88, 0x90, 0xb1, 0xea,
	0xe8, 0x84, 0x58, 0x04, 0xd5, 0xf0, 0x53, 0xd8, 0x2a, 0x82, 0x1f, 0x15, 0x63, 0x6c, 0x98, 0x03,
	0xc7, 0x30, 0x47, 0x93, 0x31, 0xaa, 0xe3, 0x1d, 0xe8, 0xde, 0x4f, 0xd0, 0xde, 0xab, 0x23, 0xf4,
	0x3f, 0xde, 0x86, 0x4e, 0x11, 0xb7, 0x55, 0xc5, 0x74, 0x4e, 0x0c, 0x73, 0xa0, 0x13, 0xb4, 0x54,
	0x35, 0x4f, 0x60, 0x55, 0x21, 0x1a, 0x6a, 0xe0, 0x0e, 0x6c, 0x94, 0xc0, 0x89, 0xaa, 0xea, 0xb6,
	0x8d, 0x96, 0xf1, 0x26, 0xe0, 0x22, 0x74, 0xa2, 0x18, 0x43, 0xb4, 0x52, 0x6d, 0x53, 0x9b, 0x90,
	0xd9, 0x8b, 0x26, 0x7e, 0x0e, 0xcf, 0x8a, 0xc8, 0x88, 0x58, 0x33, 0x31, 0x47, 0xb5, 0xcc, 0x13,
	0x63, 0x90, 0x7a, 0x42, 0x95, 0xc6, 0x3d, 0x0b, 0xb4, 0xd5, 0x7b, 0x86, 0xa6, 0xdb, 0x3a, 0x39,
	0xd3, 0xb5, 0x3e, 0x12, 0x17, 0x83, 0x07, 0xa8, 0xb5, 0x18, 0x7c, 0x83, 0xd6, 0xfa, 0xbf, 0x05,
	0x68, 0xf0, 0x4f, 0x79, 0x04, 0xcd, 0xf9, 0x21, 0x61, 0x29, 0x5b, 0xac, 0xf2, 0x2d, 0x76, 0x3b,
	0xf7, 0x20, 0x7c, 0xab, 0x8e, 0xa0, 0x69, 0x57, 0x15, 0xec, 0x85, 0x0a, 0x95, 0xb3, 0xc0, 0x16,
	0xac, 0x15, 0x37, 0x16, 0x6f, 0x57, 0xc8, 0xf9, 0x73, 0xe9, 0xee, 0x2c, 0x82, 0x53, 0xc1, 0xe3,
	0xb7, 0xd0, 0x71, 0x83, 0x6b, 0x99, 0xc5, 0x37, 0x21, 0xbd, 0x9e, 0x7a, 0xbe, 0x2b, 0xb3, 0x8b,
	0xaf, 0xfc, 0xcd, 0x48, 0xf8, 0xb4, 0x79, 0xee, 0x05, 0x2c, 0x9a, 0x86, 0xfb, 0x8c, 0x86, 0xb3,
	0xad, 0xde, 0x4f, 0x91, 0xf3, 0x46, 0xf2, 0xf7, 0x70, 0xf0, 0x27, 0x00, 0x00, 0xff, 0xff, 0xc7,
	0x94, 0x1f, 0x99, 0x4f, 0x06, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// StatusClient is the client API for Status service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type StatusClient interface {
	GetConfig(ctx context.Context, in *GetConfigRequest, opts ...grpc.CallOption) (*GetConfigResponse, error)
	SetConfig(ctx context.Context, in *SetConfigRequest, opts ...grpc.CallOption) (*SetConfigResponse, error)
	SetConfigMulti(ctx context.Context, in *SetConfigMultiRequest, opts ...grpc.CallOption) (*SetConfigMultiResponse, error)
}

type statusClient struct {
	cc *grpc.ClientConn
}

func NewStatusClient(cc *grpc.ClientConn) StatusClient {
	return &statusClient{cc}
}

func (c *statusClient) GetConfig(ctx context.Context, in *GetConfigRequest, opts ...grpc.CallOption) (*GetConfigResponse, error) {
	out := new(GetConfigResponse)
	err := c.cc.Invoke(ctx, "/status.Status/GetConfig", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *statusClient) SetConfig(ctx context.Context, in *SetConfigRequest, opts ...grpc.CallOption) (*SetConfigResponse, error) {
	out := new(SetConfigResponse)
	err := c.cc.Invoke(ctx, "/status.Status/SetConfig", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *statusClient) SetConfigMulti(ctx context.Context, in *SetConfigMultiRequest, opts ...grpc.CallOption) (*SetConfigMultiResponse, error) {
	out := new(SetConfigMultiResponse)
	err := c.cc.Invoke(ctx, "/status.Status/SetConfigMulti", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// StatusServer is the server API for Status service.
type StatusServer interface {
	GetConfig(context.Context, *GetConfigRequest) (*GetConfigResponse, error)
	SetConfig(context.Context, *SetConfigRequest) (*SetConfigResponse, error)
	SetConfigMulti(context.Context, *SetConfigMultiRequest) (*SetConfigMultiResponse, error)
}

func RegisterStatusServer(s *grpc.Server, srv StatusServer) {
	s.RegisterService(&_Status_serviceDesc, srv)
}

func _Status_GetConfig_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetConfigRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(StatusServer).GetConfig(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/status.Status/GetConfig",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(StatusServer).GetConfig(ctx, req.(*GetConfigRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Status_SetConfig_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SetConfigRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(StatusServer).SetConfig(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/status.Status/SetConfig",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(StatusServer).SetConfig(ctx, req.(*SetConfigRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Status_SetConfigMulti_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SetConfigMultiRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(StatusServer).SetConfigMulti(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/status.Status/SetConfigMulti",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(StatusServer).SetConfigMulti(ctx, req.(*SetConfigMultiRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Status_serviceDesc = grpc.ServiceDesc{
	ServiceName: "status.Status",
	HandlerType: (*StatusServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetConfig",
			Handler:    _Status_GetConfig_Handler,
		},
		{
			MethodName: "SetConfig",
			Handler:    _Status_SetConfig_Handler,
		},
		{
			MethodName: "SetConfigMulti",
			Handler:    _Status_SetConfigMulti_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "status.proto",
}
