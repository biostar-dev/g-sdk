---
title: "Zone API"
toc_label: "Zone"  
---

You can configure several types of zones for high-level functions such as anti passback and intrusion alarm. G-SDK supports only local zones, where all devices should be within a RS485 network. 

# Status

```protobuf
message ZoneStatus {
  uint32 zoneID;
  Status status;
  bool disabled;
}
```
{: #ZoneStatus}

zoneID
: The ID of the zone.

[status](#Status)
: The status of the zone. 

disabled
: Indicate whether the zone is disabled. 

```protobuf
enum Status {
  NORMAL = 0x00;
  ALARMED = 0x01;

  LOCKED = 0x02;
  UNLOCKED = 0x04;

  LIFT_LOCKED = 0x02;
  LIFT_UNLOCKED = 0x04;

  ARMED = 0x08;
  DISARMED = 0x00;
}
```
{: #Status}
NORMAL
: The zone is working properly.

ALARMED
: Alarms are detected in the zone.

LOCKED
: The zone is locked by schedule. Only for [the scheduled lock zone]({{ 'api/zone/lock' | relative_url }}).

UNLOCKED
: The zone is unlocked by schedule. Only for [the scheduled lock zone]({{ 'api/zone/lock' | relative_url }}).

LIFT_LOCKED
: The lifts are deactivated by schedule. Only for [the lift zone]({{ 'api/zone/lift' | relative_url }}).

LIFT_UNLOCKED
: The lifts are activated by schedule. Only for [the lift zone]({{ 'api/zone/lift' | relative_url }}).

ARMED
: [The intrusion alarm zone]({{ 'api/zone/intrusion' | relative_url }}) is armed. 

DISARMED
: [The intrusion alarm zone]({{ 'api/zone/intrusion' | relative_url }}) is disarmed. It is the normal status of the intrusion alarm zone. 

# [Anti passback zone]({{ 'api/zone/apb' | relative_url }})

Anti passback zone is used to prevent users from passing their credentials back to a second person to enter an area. An anti passback zone consists of multiple members, each of which is either of type __ENTRY__ or __EXIT__. 

# [Timed anti passback zone]({{ 'api/zone/timed' | relative_url }})

In a timed anti passback zone, a credential can be used at the same device again only after a designated amount of time. 

# [Intrusion alarm zone]({{ 'api/zone/intrusion' | relative_url }})

Intrusion alarm zone is used to detect trespassing of unauthorized users to an armed area without permission. 

# [Fire alarm zone]({{ 'api/zone/fire' | relative_url }})

A fire alarm zone consists of multiple doors and sensors to detect emergencies. When a fire is detected, all the doors will be unlocked automatically. 

# [Scheduled lock zone]({{ 'api/zone/lock' | relative_url }})

You can keep doors locked or unlocked according to the specified schedules. 

# [Interlock zone]({{ 'api/zone/interlock' | relative_url }})

Interlock zone monitors the status of two or more doors to control that one door cannot be opened or closed if other doors are open or unlocked. You can also disable access if a user stays within the zone.

# [Lift zone]({{ 'api/zone/lift' | relative_url }})

You can keep floors of a lift activated or deactivated according to the specified schedules. 