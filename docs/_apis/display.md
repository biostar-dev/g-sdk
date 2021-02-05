---
title: "Display API"
toc_label: "Display"  
---

You can configure UI options using __DisplayConfig__. You can also change the language pack, background images, and sounds.

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
  bool queryUserPhrase;
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

[dateFormat](#DateFormat)
: 

[timeFormat](#TimeFormat)
: 

showDateTime
: If true, show the clock on the screen.

menuTimeout
: Close the menu after the timeout in seconds. The default is 20 seconds.

msgTimeout
: Close the message dialog after the timeout in milliseconds. The default is 2,000 milliseconds.

backlightTimeout
: Turn off the backlight after the timeout in seconds. The default is 20 seconds.

useUserPhrase
: Show a specific message when a user is authenticated. [CapabilityInfo.userPhraseSupported]({{'/api/device/' | relative_url}}#CapabilityInfo) of the device should be true.

queryUserPhrase
: If __useUserPhrase__ is true, ask the device gateway of the phrase to be displayed. Refer to [Server API]({{'/api/server/' | relative_url}}) for details.


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

BS2_BG_LOGO
: Show a background image. You can change the background image using [UpdateBackgroundImage](#updatebackgroundimage).

BS2_BG_NOTICE
: Show a message. You can change the message using [UpdateNotice](#updatenotice);

BS2_BG_SLIDE
: Show image slides. You can change the slides using [UpdateSlideImages](#updateslideimages).


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


## Language pack

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

## Notice

You can change the notice message displayed in the main UI. You have to set [DisplayConfig.background](#DisplayConfig) to [BS2_BG_NOTICE](#BackgroundType) first.

### UpdateNotice

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| notice | string | The message to be displayed |

### UpdateNoticeMulti

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| notice | string | The message to be displayed |

## Background image

You can change the background image displayed in the main UI. [DisplayConfig.background](#DisplayConfig) should be set to [BS2_BG_LOGO](#BackgroundType).

### UpdateBackgroundImage

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| PNGImage | byte[] | The PNG image data to be displayed |

### UpdateBackgroundImageMulti

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32 | The IDs of the devices |
| PNGImage | byte[] | The PNG image data to be displayed |

## Background slides

You can change the slides displayed in the main UI. [DisplayConfig.background](#DisplayConfig) should be set to [BS2_BG_SLIDE](#BackgroundType).

### UpdateSlideImages

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| PNGImages | byte[][] | The array of PNG image data to be displayed |

### UpdateSlideImagesMulti

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32 | The IDs of the devices |
| PNGImages | byte[][] | The array of PNG image data to be displayed |

## Sound

Change the sound files for the specified cases.

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

### UpdateSound

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| index | [SoundIndex](#SoundIndex) | The sound index whose file to be updated |
| waveData | byte[] | The sound data in WAVE file format |

### UpdateSoundMulti

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32 | The IDs of the devices |
| index | [SoundIndex](#SoundIndex) | The sound index whose file to be updated |
| waveData | byte[] | The sound data in WAVE file format |


