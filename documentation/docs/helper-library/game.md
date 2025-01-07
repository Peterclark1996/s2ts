---
sidebar_position: 4
---

# game

The `game` object lets you trigger functions when specific game events happen, trigger functions every game tick, and trigger functions with specified delays.

## game.on

:::important
This function needs the `ent_create` command to create the event listeners so requires `sv_cheats` to be enabled. Therefore this is basically unusable outside of local servers. Also currently there is no way to get the event data which makes this mostly useless currently.
:::

Listen to game events and run a function when that event is fired.

<details>
    <summary>List of all events (Some are now irrelevant in cs2 and likely wont work)</summary>
    - player_death
    - other_death
    - player_hurt
    - item_purchase
    - bomb_beginplant
    - bomb_abortplant
    - bomb_planted
    - bomb_defused
    - bomb_exploded
    - bomb_dropped
    - bomb_pickup
    - defuser_dropped
    - defuser_pickup
    - announce_phase_end
    - cs_intermission
    - bomb_begindefuse
    - bomb_abortdefuse
    - hostage_follows
    - hostage_hurt
    - hostage_killed
    - hostage_rescued
    - hostage_stops_following
    - hostage_rescued_all
    - hostage_call_for_help
    - vip_escaped
    - vip_killed
    - player_radio
    - bomb_beep
    - weapon_fire
    - weapon_fire_on_empty
    - grenade_thrown
    - weapon_reload
    - weapon_zoom
    - silencer_detach
    - inspect_weapon
    - weapon_zoom_rifle
    - player_spawned
    - item_pickup
    - item_pickup_slerp
    - item_pickup_failed
    - item_remove
    - ammo_pickup
    - item_equip
    - enter_buyzone
    - exit_buyzone
    - buytime_ended
    - enter_bombzone
    - exit_bombzone
    - enter_rescue_zone
    - exit_rescue_zone
    - silencer_off
    - silencer_on
    - buymenu_open
    - buymenu_close
    - round_prestart
    - round_poststart
    - round_start
    - round_end
    - grenade_bounce
    - hegrenade_detonate
    - flashbang_detonate
    - smokegrenade_detonate
    - smokegrenade_expired
    - molotov_detonate
    - decoy_detonate
    - decoy_started
    - tagrenade_detonate
    - inferno_startburn
    - inferno_expire
    - inferno_extinguish
    - decoy_firing
    - bullet_impact
    - player_footstep
    - player_jump
    - player_blind
    - player_falldamage
    - door_moving
    - round_freeze_end
    - mb_input_lock_success
    - mb_input_lock_cancel
    - nav_blocked
    - nav_generate
    - player_stats_updated
    - achievement_info_loaded
    - spec_target_updated
    - spec_mode_updated
    - hltv_changed_mode
    - cs_game_disconnected
    - cs_win_panel_round
    - cs_win_panel_match
    - cs_match_end_restart
    - cs_pre_restart
    - player_avenged_teammate
    - achievement_earned
    - achievement_earned_local
    - repost_xbox_achievements
    - match_end_conditions
    - round_mvp
    - player_decal
    - teamplay_round_start
    - show_survival_respawn_status
    - client_disconnect
    - gg_killed_enemy
    - switch_team
    - write_profile_data
    - trial_time_expired
    - update_matchmaking_stats
    - player_reset_vote
    - enable_restart_voting
    - sfuievent
    - start_vote
    - player_given_c4
    - bot_takeover
    - jointeam_failed
    - teamchange_pending
    - material_default_complete
    - cs_prev_next_spectator
    - nextlevel_changed
    - seasoncoin_levelup
    - tournament_reward
    - start_halftime
    - ammo_refill
    - parachute_pickup
    - parachute_deploy
    - dronegun_attack
    - drone_dispatched
    - loot_crate_visible
    - loot_crate_opened
    - open_crate_instr
    - smoke_beacon_paradrop
    - survival_paradrop_spawn
    - survival_paradrop_break
    - drone_cargo_detached
    - drone_above_roof
    - choppers_incoming_warning
    - firstbombs_incoming_warning
    - dz_item_interaction
    - survival_teammate_respawn
    - survival_no_respawns_warning
    - survival_no_respawns_final
    - player_ping
    - player_ping_stop
    - guardian_wave_restart
</details>

```ts title="Trigger a function on the weapon_fire event"
import { Instance } from "cspointscript"
import { game } from "s2ts/counter-strike"

game.on("weapon_fire", () => {
    // Do something when someone fires their gun
})
```

## game.onTick

Runs a function every game tick (64 times a second)

```ts title="Run a function every game tick"
import { Instance } from "cspointscript"
import { game } from "s2ts/counter-strike"

game.onTick(() => {
    // Do something every game tick
})
```

## game.runNextTick

Runs a function on the next game tick

```ts title="Run a function on the next game tick"
import { Instance } from "cspointscript"
import { game } from "s2ts/counter-strike"

game.runNextTick(() => {
    // Do something next game tick
})
```

## game.runAfterDelayTicks

Runs a function after a delay of ticks

```ts title="Run a function after a delay of ticks"
import { Instance } from "cspointscript"
import { game } from "s2ts/counter-strike"

game.runAfterDelayTicks(() => {
    // Do something after 128 ticks (2 seconds)
}, 128)
```

## game.runAfterDelaySeconds

Runs a function after a delay in seconds

```ts title="Run a function after a delay in seconds"
import { Instance } from "cspointscript"
import { game } from "s2ts/counter-strike"

game.runAfterDelaySeconds(() => {
    // Do something after 2.5 seconds (160 ticks)
}, 2.5)
```