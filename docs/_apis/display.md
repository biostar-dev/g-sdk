---
title: "Display API"
toc_label: "Display"  
---

Chaning resources such as logo images and sound files are not supported for V1.0. They will be supported in later versions.
{: .notice--warning}

## Config

```protobuf
message DisplayConfig {
  LanguageType language;
  BackgroundType background;
  BackgroundTheme theme;

  uint32 volume;
  bool useVoice;

  DateFormat dateFormat;
  TimeFormat timeFormat;
  bool showDateTime;

  uint32 menuTimeout;
  uint32 msgTimeout;
  uint32 backlightTimeout;

  bool useUserPhrase;
}
```
{: #DisplayConfig }

[language](#LanguageType)
: As default, English and Korean are supported.

[background](#BackgroundType)
: The background image of the device. 

theme
: Not yet supported.

volume
: Volume level between 0(no sound) and 100(loudest).

useVoice
: Activate the voice instruction.

[dateFormat](#DataFormat)
: 

[timeFormat](#TimeFormat)
: 

showDateTime
: If true, show the clock on the screen.

menuTimeout
: Close the menu after the timeout in seconds. The default is 20 seconds.

msgTimeout
: Close the mesage dialog after the timeout in milliseconds. The default is 2,000 milliseconds.

backlightTimeout
: Turn off the backlight after the timeout in seconds. The default is 20 seconds.



```protobuf
enum LanguageType {
  BS2_LANGUAGE_KOREAN = 0;
  BS2_LANGUAGE_ENGLISH = 1;
  BS2_LANGUAGE_CUSTOM = 2;
}
```
{: #LanguageType }

```protobuf
enum BackgroundType {
  BS2_BG_LOGO = 0;
  BS2_BG_NOTICE = 1;
  BS2_BG_SLIDE = 2;
  BS2_BG_PDF = 3;
}
```
{: #BackgroundType }

```protobuf
enum DateFormat {
  BS2_DATE_FORMAT_YYYYMMDD = 0;
  BS2_DATE_FORMAT_MMDDYYYY = 1;
  BS2_DATE_FORMAT_DDMMYYYY = 2;
}
```
{: #DateFormat }

```protobuf
enum TimeFormat {
  BS2_TIME_FORMAT_12_HOUR = 0;
  BS2_TIME_FORMAT_24_HOUR = 1;
}
```
{: #TimeFormat }

```protobuf
enum SoundIndex {
  SOUND_INDEX_WELCOME = 0;
  SOUND_INDEX_AUTH_SUCCESS = 1;
  SOUND_INDEX_AUTH_FAIL = 2;
  SOUND_INDEX_ALARM_1 = 3;
  SOUND_INDEX_ALARM_2 = 4;
}
```
{: #SoundIndex }


### GetConfig

Get the display configuration of a device. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [DisplayConfig](#DisplayConfig) | The display configuration of the device |


### SetConfig

Change the display configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [DisplayConfig](#DisplayConfig) | The display configuration to be written to the device |

### SetConfigMulti

Change the display configurations of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| config | [DisplayConfig](#DisplayConfig) | The display configuration to be written to the devices  |


## Language Pack

You can change the language pack used in the UI. For the available language packs, contact [us](https://www.supremainc.com/en/about/contact-us.asp).

### UpdateLanguagePack

Update the language pack of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| data | byte[] | The language pack to be installed on the device |

### UpdateLanguagePackMulti

Update the language packs of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| data | byte[] | The language pack to be installed on the devices |
