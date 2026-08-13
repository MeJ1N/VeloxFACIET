(() => {
  "use strict";

  const API = "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json";
  const FALLBACK_IMAGE = "https://community.akamai.steamstatic.com/economy/image/"; // only used as a marker if a remote image fails

  const FALLBACK_SKINS = [
    {id:"fb1",name:"AK-47 | Redline (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:10,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_redline_light_png.png"},
    {id:"fb2",name:"AK-47 | Asiimov (Factory New)",rarity:{name:"Covert",color:"#eb4b4b"},price:10.85,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_asiimov_light_png.png"},
    {id:"fb3",name:"AK-47 | Vulcan (Factory New)",rarity:{name:"Restricted",color:"#8847ff"},price:10,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_vulcan_light_png.png"},
    {id:"fb4",name:"AK-47 | Fire Serpent (Factory New)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:11.04,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_fire_serpent_light_png.png"},
    {id:"fb5",name:"AK-47 | The Empress (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:10.75,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_gs_ak47_empress_light_png.png"},
    {id:"fb6",name:"AK-47 | Bloodsport (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:11.22,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_gs_ak47_bloodsport_light_png.png"},
    {id:"fb7",name:"AK-47 | Neon Rider (Factory New)",rarity:{name:"Covert",color:"#eb4b4b"},price:12.18,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_noriderr_light_png.png"},
    {id:"fb8",name:"AK-47 | Legion of Anubis (Factory New)",rarity:{name:"Restricted",color:"#8847ff"},price:11.05,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_anubis_light_png.png"},
    {id:"fb9",name:"AK-47 | Inheritance (Factory New)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:12.39,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_inheritance_light_png.png"},
    {id:"fb10",name:"AK-47 | Head Shot (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:12.06,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_headshot_light_png.png"},
    {id:"fb11",name:"AWP | Asiimov (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:12.6,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_asimov_light_png.png"},
    {id:"fb12",name:"AWP | Dragon Lore (Factory New)",rarity:{name:"Covert",color:"#eb4b4b"},price:13.67,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_medieval_dragon_light_png.png"},
    {id:"fb13",name:"AWP | Lightning Strike (Factory New)",rarity:{name:"Restricted",color:"#8847ff"},price:12.4,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_am_lightning_strike_light_png.png"},
    {id:"fb14",name:"AWP | Wildfire (Factory New)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:13.91,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_wildfire_light_png.png"},
    {id:"fb15",name:"AWP | Hyper Beast (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:13.54,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_hyper_beast_light_png.png"},
    {id:"fb16",name:"AWP | Containment Breach (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:14.14,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_containment_breach_light_png.png"},
    {id:"fb17",name:"AWP | Neo-Noir (Factory New)",rarity:{name:"Covert",color:"#eb4b4b"},price:15.34,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_neonoir_light_png.png"},
    {id:"fb18",name:"M4A1-S | Printstream (Factory New)",rarity:{name:"Restricted",color:"#8847ff"},price:13.92,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_printstream_light_png.png"},
    {id:"fb19",name:"M4A1-S | Hyper Beast (Factory New)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:15.61,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_hyperbeast_light_png.png"},
    {id:"fb20",name:"M4A1-S | Player Two (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:15.2,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_player_two_light_png.png"},
    {id:"fb21",name:"M4A1-S | Golden Coil (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:15.87,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_aq_m4a1s_elegant_light_png.png"},
    {id:"fb22",name:"M4A1-S | Blue Phosphor (Factory New)",rarity:{name:"Covert",color:"#eb4b4b"},price:17.22,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_am_damascus_steel_light_png.png"},
    {id:"fb23",name:"M4A4 | Howl (Factory New)",rarity:{name:"Restricted",color:"#8847ff"},price:15.63,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_howl_light_png.png"},
    {id:"fb24",name:"M4A4 | Poseidon (Factory New)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:17.52,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_poseidon_light_png.png"},
    {id:"fb25",name:"M4A4 | Asiimov (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:17.06,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_asiimov_light_png.png"},
    {id:"fb26",name:"M4A4 | The Emperor (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:17.82,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_the_emperor_light_png.png"},
    {id:"fb27",name:"M4A4 | Desolate Space (Factory New)",rarity:{name:"Covert",color:"#eb4b4b"},price:19.33,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_desolate_space_light_png.png"},
    {id:"fb28",name:"Desert Eagle | Printstream (Factory New)",rarity:{name:"Restricted",color:"#8847ff"},price:17.54,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_cu_deag_printstream_light_png.png"},
    {id:"fb29",name:"Desert Eagle | Blaze (Factory New)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:19.67,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_aa_deagle_lightning_light_png.png"},
    {id:"fb30",name:"Desert Eagle | Code Red (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:19.15,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_gs_deagle_code_red_light_png.png"},
    {id:"fb31",name:"Desert Eagle | Ocean Drive (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:20.0,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_cu_deag_jacuzzi_light_png.png"},
    {id:"fb32",name:"Desert Eagle | Cobalt Disruption (Factory New)",rarity:{name:"Covert",color:"#eb4b4b"},price:21.69,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_aq_deagle_naga_light_png.png"},
    {id:"fb33",name:"Glock-18 | Vogue (Factory New)",rarity:{name:"Restricted",color:"#8847ff"},price:19.69,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_eyecontact_light_png.png"},
    {id:"fb34",name:"Glock-18 | Gamma Doppler (Factory New)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:22.08,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_gamma_doppler_light_png.png"},
    {id:"fb35",name:"Glock-18 | Bullet Queen (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:21.5,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_bullet_queen_light_png.png"},
    {id:"fb36",name:"USP-S | Kill Confirmed (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:22.45,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_krokos_light_png.png"},
    {id:"fb37",name:"USP-S | Printstream (Factory New)",rarity:{name:"Covert",color:"#eb4b4b"},price:24.35,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_printstream_light_png.png"},
    {id:"fb38",name:"USP-S | The Traitor (Factory New)",rarity:{name:"Restricted",color:"#8847ff"},price:22.1,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_the_traitor_light_png.png"},
    {id:"fb39",name:"USP-S | Neo-Noir (Factory New)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:24.78,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_neonoir_light_png.png"},
    {id:"fb40",name:"P250 | See Ya Later (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:24.13,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_gs_p250_see_ya_later_light_png.png"},
    {id:"fb41",name:"P250 | Asiimov (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:25.2,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_gs_p250_asiimov_light_png.png"},
    {id:"fb42",name:"P250 | Mehndi (Factory New)",rarity:{name:"Covert",color:"#eb4b4b"},price:27.33,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_am_p250_mehndi_light_png.png"},
    {id:"fb43",name:"FAMAS | Commemoration (Factory New)",rarity:{name:"Restricted",color:"#8847ff"},price:24.8,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_famas_cu_famas_jinn_light_png.png"},
    {id:"fb44",name:"FAMAS | Roll Cage (Factory New)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:27.81,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_famas_gs_famas_roll_cage_light_png.png"},
    {id:"fb45",name:"Galil AR | Chatterbox (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:27.08,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_galilar_cu_galil_ak_chatterbox_light_png.png"},
    {id:"fb46",name:"Galil AR | Eco (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:28.28,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_galilar_cu_galil_eco_light_png.png"},
    {id:"fb47",name:"SG 553 | Integrale (Factory New)",rarity:{name:"Covert",color:"#eb4b4b"},price:30.68,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_sg556_cu_sg553_integrale_light_png.png"},
    {id:"fb48",name:"SSG 08 | Dragonfire (Factory New)",rarity:{name:"Restricted",color:"#8847ff"},price:27.84,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ssg08_cu_ssg08_dragonfire_light_png.png"},
    {id:"fb49",name:"SSG 08 | Bloodshot (Factory New)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:31.22,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ssg08_cu_ssg08_bloodshot_light_png.png"},
    {id:"fb50",name:"MP9 | Starlight Protector (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:30.4,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_mp9_cu_mp9_starlight_light_png.png"},
    {id:"fb51",name:"MAC-10 | Stalker (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:31.74,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_mac10_gs_mac10_stalker_light_png.png"},
    {id:"fb52",name:"MP7 | Bloodsport (Factory New)",rarity:{name:"Covert",color:"#eb4b4b"},price:34.44,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_mp7_gs_mp7_bloodsport_light_png.png"},
    {id:"fb53",name:"P90 | Death by Kitty (Factory New)",rarity:{name:"Restricted",color:"#8847ff"},price:31.25,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p90_cu_p90_scorpio_light_png.png"},
    {id:"fb54",name:"P90 | Asiimov (Factory New)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:35.04,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p90_cu_p90_asiimov_light_png.png"},
    {id:"fb55",name:"Five-SeveN | Monkey Business (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:34.12,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_fiveseven_gs_fiveseven_monkeybusiness_light_png.png"},
    {id:"fb56",name:"Five-SeveN | Hyper Beast (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:35.63,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_fiveseven_gs_fiveseven_hyperbeast_light_png.png"},
    {id:"fb57",name:"Tec-9 | Fuel Injector (Factory New)",rarity:{name:"Covert",color:"#eb4b4b"},price:38.65,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_tec9_gs_tec9_fuel_injector_light_png.png"},
    {id:"fb58",name:"CZ75-Auto | Xiangliu (Factory New)",rarity:{name:"Restricted",color:"#8847ff"},price:35.08,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_cz75a_gs_cz75a_chastizer_light_png.png"},
    {id:"fb59",name:"R8 Revolver | Fade (Factory New)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:39.33,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_revolver_aa_revolver_fade_light_png.png"},
    {id:"fb60",name:"\u2605 Karambit | Doppler (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:38.3,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_karambit_am_marble_fade_light_png.png"},
    {id:"fb61",name:"\u2605 Karambit | Fade (Factory New)",rarity:{name:"Classified",color:"#d32ce6"},price:40.0,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_karambit_aa_fade_light_png.png"},
    {id:"fb62",name:"\u2605 Butterfly Knife | Doppler (Factory New)",rarity:{name:"Covert",color:"#eb4b4b"},price:43.39,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_butterfly_am_marble_fade_light_png.png"},
    {id:"fb63",name:"\u2605 M9 Bayonet | Doppler (Factory New)",rarity:{name:"Restricted",color:"#8847ff"},price:39.37,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_m9_bayonet_am_marble_fade_light_png.png"},
    {id:"fb64",name:"\u2605 Sport Gloves | Vice (Factory New)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:44.15,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/ct_gloves_sporty_militia_light_png.png"},
    {id:"fb65",name:"AK-47 | Redline (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:42.99,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_redline_light_png.png"},
    {id:"fb66",name:"AK-47 | Asiimov (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:44.89,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_asiimov_light_png.png"},
    {id:"fb67",name:"AK-47 | Vulcan (Minimal Wear)",rarity:{name:"Covert",color:"#eb4b4b"},price:48.7,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_vulcan_light_png.png"},
    {id:"fb68",name:"AK-47 | Fire Serpent (Minimal Wear)",rarity:{name:"Restricted",color:"#8847ff"},price:44.19,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_fire_serpent_light_png.png"},
    {id:"fb69",name:"AK-47 | The Empress (Minimal Wear)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:49.56,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_gs_ak47_empress_light_png.png"},
    {id:"fb70",name:"AK-47 | Bloodsport (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:48.25,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_gs_ak47_bloodsport_light_png.png"},
    {id:"fb71",name:"AK-47 | Neon Rider (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:50.39,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_noriderr_light_png.png"},
    {id:"fb72",name:"AK-47 | Legion of Anubis (Minimal Wear)",rarity:{name:"Covert",color:"#eb4b4b"},price:54.66,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_anubis_light_png.png"},
    {id:"fb73",name:"AK-47 | Inheritance (Minimal Wear)",rarity:{name:"Restricted",color:"#8847ff"},price:49.61,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_inheritance_light_png.png"},
    {id:"fb74",name:"AK-47 | Head Shot (Minimal Wear)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:55.63,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_headshot_light_png.png"},
    {id:"fb75",name:"AWP | Asiimov (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:54.16,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_asimov_light_png.png"},
    {id:"fb76",name:"AWP | Dragon Lore (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:56.56,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_medieval_dragon_light_png.png"},
    {id:"fb77",name:"AWP | Lightning Strike (Minimal Wear)",rarity:{name:"Covert",color:"#eb4b4b"},price:61.35,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_am_lightning_strike_light_png.png"},
    {id:"fb78",name:"AWP | Wildfire (Minimal Wear)",rarity:{name:"Restricted",color:"#8847ff"},price:55.68,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_wildfire_light_png.png"},
    {id:"fb79",name:"AWP | Hyper Beast (Minimal Wear)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:62.44,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_hyper_beast_light_png.png"},
    {id:"fb80",name:"AWP | Containment Breach (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:60.8,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_containment_breach_light_png.png"},
    {id:"fb81",name:"AWP | Neo-Noir (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:63.49,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_neonoir_light_png.png"},
    {id:"fb82",name:"M4A1-S | Printstream (Minimal Wear)",rarity:{name:"Covert",color:"#eb4b4b"},price:68.87,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_printstream_light_png.png"},
    {id:"fb83",name:"M4A1-S | Hyper Beast (Minimal Wear)",rarity:{name:"Restricted",color:"#8847ff"},price:62.5,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_hyperbeast_light_png.png"},
    {id:"fb84",name:"M4A1-S | Player Two (Minimal Wear)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:70.08,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_player_two_light_png.png"},
    {id:"fb85",name:"M4A1-S | Golden Coil (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:68.24,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_aq_m4a1s_elegant_light_png.png"},
    {id:"fb86",name:"M4A1-S | Blue Phosphor (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:71.26,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_am_damascus_steel_light_png.png"},
    {id:"fb87",name:"M4A4 | Howl (Minimal Wear)",rarity:{name:"Covert",color:"#eb4b4b"},price:77.3,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_howl_light_png.png"},
    {id:"fb88",name:"M4A4 | Poseidon (Minimal Wear)",rarity:{name:"Restricted",color:"#8847ff"},price:70.15,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_poseidon_light_png.png"},
    {id:"fb89",name:"M4A4 | Asiimov (Minimal Wear)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:78.66,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_asiimov_light_png.png"},
    {id:"fb90",name:"M4A4 | The Emperor (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:76.6,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_the_emperor_light_png.png"},
    {id:"fb91",name:"M4A4 | Desolate Space (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:79.99,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_desolate_space_light_png.png"},
    {id:"fb92",name:"Desert Eagle | Printstream (Minimal Wear)",rarity:{name:"Covert",color:"#eb4b4b"},price:86.77,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_cu_deag_printstream_light_png.png"},
    {id:"fb93",name:"Desert Eagle | Blaze (Minimal Wear)",rarity:{name:"Restricted",color:"#8847ff"},price:78.74,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_aa_deagle_lightning_light_png.png"},
    {id:"fb94",name:"Desert Eagle | Code Red (Minimal Wear)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:88.3,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_gs_deagle_code_red_light_png.png"},
    {id:"fb95",name:"Desert Eagle | Ocean Drive (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:85.97,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_cu_deag_jacuzzi_light_png.png"},
    {id:"fb96",name:"Desert Eagle | Cobalt Disruption (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:89.78,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_aq_deagle_naga_light_png.png"},
    {id:"fb97",name:"Glock-18 | Vogue (Minimal Wear)",rarity:{name:"Covert",color:"#eb4b4b"},price:97.39,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_eyecontact_light_png.png"},
    {id:"fb98",name:"Glock-18 | Gamma Doppler (Minimal Wear)",rarity:{name:"Restricted",color:"#8847ff"},price:88.38,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_gamma_doppler_light_png.png"},
    {id:"fb99",name:"Glock-18 | Bullet Queen (Minimal Wear)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:99.11,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_bullet_queen_light_png.png"},
    {id:"fb100",name:"USP-S | Kill Confirmed (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:96.5,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_krokos_light_png.png"},
    {id:"fb101",name:"USP-S | Printstream (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:100.77,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_printstream_light_png.png"},
    {id:"fb102",name:"USP-S | The Traitor (Minimal Wear)",rarity:{name:"Covert",color:"#eb4b4b"},price:109.32,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_the_traitor_light_png.png"},
    {id:"fb103",name:"USP-S | Neo-Noir (Minimal Wear)",rarity:{name:"Restricted",color:"#8847ff"},price:99.21,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_neonoir_light_png.png"},
    {id:"fb104",name:"P250 | See Ya Later (Minimal Wear)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:111.25,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_gs_p250_see_ya_later_light_png.png"},
    {id:"fb105",name:"P250 | Asiimov (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:108.32,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_gs_p250_asiimov_light_png.png"},
    {id:"fb106",name:"P250 | Mehndi (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:113.11,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_am_p250_mehndi_light_png.png"},
    {id:"fb107",name:"FAMAS | Commemoration (Minimal Wear)",rarity:{name:"Covert",color:"#eb4b4b"},price:122.7,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_famas_cu_famas_jinn_light_png.png"},
    {id:"fb108",name:"FAMAS | Roll Cage (Minimal Wear)",rarity:{name:"Restricted",color:"#8847ff"},price:111.35,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_famas_gs_famas_roll_cage_light_png.png"},
    {id:"fb109",name:"Galil AR | Chatterbox (Minimal Wear)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:124.87,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_galilar_cu_galil_ak_chatterbox_light_png.png"},
    {id:"fb110",name:"Galil AR | Eco (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:121.58,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_galilar_cu_galil_eco_light_png.png"},
    {id:"fb111",name:"SG 553 | Integrale (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:126.96,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_sg556_cu_sg553_integrale_light_png.png"},
    {id:"fb112",name:"SSG 08 | Dragonfire (Minimal Wear)",rarity:{name:"Covert",color:"#eb4b4b"},price:137.73,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ssg08_cu_ssg08_dragonfire_light_png.png"},
    {id:"fb113",name:"SSG 08 | Bloodshot (Minimal Wear)",rarity:{name:"Restricted",color:"#8847ff"},price:124.99,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ssg08_cu_ssg08_bloodshot_light_png.png"},
    {id:"fb114",name:"MP9 | Starlight Protector (Minimal Wear)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:140.16,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_mp9_cu_mp9_starlight_light_png.png"},
    {id:"fb115",name:"MAC-10 | Stalker (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:136.47,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_mac10_gs_mac10_stalker_light_png.png"},
    {id:"fb116",name:"MP7 | Bloodsport (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:142.51,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_mp7_gs_mp7_bloodsport_light_png.png"},
    {id:"fb117",name:"P90 | Death by Kitty (Minimal Wear)",rarity:{name:"Covert",color:"#eb4b4b"},price:154.59,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p90_cu_p90_scorpio_light_png.png"},
    {id:"fb118",name:"P90 | Asiimov (Minimal Wear)",rarity:{name:"Restricted",color:"#8847ff"},price:140.29,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p90_cu_p90_asiimov_light_png.png"},
    {id:"fb119",name:"Five-SeveN | Monkey Business (Minimal Wear)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:157.32,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_fiveseven_gs_fiveseven_monkeybusiness_light_png.png"},
    {id:"fb120",name:"Five-SeveN | Hyper Beast (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:153.18,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_fiveseven_gs_fiveseven_hyperbeast_light_png.png"},
    {id:"fb121",name:"Tec-9 | Fuel Injector (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:159.96,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_tec9_gs_tec9_fuel_injector_light_png.png"},
    {id:"fb122",name:"CZ75-Auto | Xiangliu (Minimal Wear)",rarity:{name:"Covert",color:"#eb4b4b"},price:173.52,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_cz75a_gs_cz75a_chastizer_light_png.png"},
    {id:"fb123",name:"R8 Revolver | Fade (Minimal Wear)",rarity:{name:"Restricted",color:"#8847ff"},price:157.47,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_revolver_aa_revolver_fade_light_png.png"},
    {id:"fb124",name:"\u2605 Karambit | Doppler (Minimal Wear)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:176.58,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_karambit_am_marble_fade_light_png.png"},
    {id:"fb125",name:"\u2605 Karambit | Fade (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:171.94,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_karambit_aa_fade_light_png.png"},
    {id:"fb126",name:"\u2605 Butterfly Knife | Doppler (Minimal Wear)",rarity:{name:"Classified",color:"#d32ce6"},price:179.55,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_butterfly_am_marble_fade_light_png.png"},
    {id:"fb127",name:"\u2605 M9 Bayonet | Doppler (Minimal Wear)",rarity:{name:"Covert",color:"#eb4b4b"},price:194.77,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_m9_bayonet_am_marble_fade_light_png.png"},
    {id:"fb128",name:"\u2605 Sport Gloves | Vice (Minimal Wear)",rarity:{name:"Restricted",color:"#8847ff"},price:176.76,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/ct_gloves_sporty_militia_light_png.png"},
    {id:"fb129",name:"AK-47 | Redline (Field-Tested)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:198.21,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_redline_light_png.png"},
    {id:"fb130",name:"AK-47 | Asiimov (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:192.99,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_asiimov_light_png.png"},
    {id:"fb131",name:"AK-47 | Vulcan (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:201.53,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_vulcan_light_png.png"},
    {id:"fb132",name:"AK-47 | Fire Serpent (Field-Tested)",rarity:{name:"Covert",color:"#eb4b4b"},price:218.62,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_fire_serpent_light_png.png"},
    {id:"fb133",name:"AK-47 | The Empress (Field-Tested)",rarity:{name:"Restricted",color:"#8847ff"},price:198.4,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_gs_ak47_empress_light_png.png"},
    {id:"fb134",name:"AK-47 | Bloodsport (Field-Tested)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:222.48,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_gs_ak47_bloodsport_light_png.png"},
    {id:"fb135",name:"AK-47 | Neon Rider (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:216.62,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_noriderr_light_png.png"},
    {id:"fb136",name:"AK-47 | Legion of Anubis (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:226.21,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_anubis_light_png.png"},
    {id:"fb137",name:"AK-47 | Inheritance (Field-Tested)",rarity:{name:"Covert",color:"#eb4b4b"},price:245.39,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_inheritance_light_png.png"},
    {id:"fb138",name:"AK-47 | Head Shot (Field-Tested)",rarity:{name:"Restricted",color:"#8847ff"},price:222.69,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_headshot_light_png.png"},
    {id:"fb139",name:"AWP | Asiimov (Field-Tested)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:249.72,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_asimov_light_png.png"},
    {id:"fb140",name:"AWP | Dragon Lore (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:243.15,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_medieval_dragon_light_png.png"},
    {id:"fb141",name:"AWP | Lightning Strike (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:253.91,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_am_lightning_strike_light_png.png"},
    {id:"fb142",name:"AWP | Wildfire (Field-Tested)",rarity:{name:"Covert",color:"#eb4b4b"},price:275.44,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_wildfire_light_png.png"},
    {id:"fb143",name:"AWP | Hyper Beast (Field-Tested)",rarity:{name:"Restricted",color:"#8847ff"},price:249.96,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_hyper_beast_light_png.png"},
    {id:"fb144",name:"AWP | Containment Breach (Field-Tested)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:280.3,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_containment_breach_light_png.png"},
    {id:"fb145",name:"AWP | Neo-Noir (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:272.92,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_neonoir_light_png.png"},
    {id:"fb146",name:"M4A1-S | Printstream (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:285.0,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_printstream_light_png.png"},
    {id:"fb147",name:"M4A1-S | Hyper Beast (Field-Tested)",rarity:{name:"Covert",color:"#eb4b4b"},price:309.16,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_hyperbeast_light_png.png"},
    {id:"fb148",name:"M4A1-S | Player Two (Field-Tested)",rarity:{name:"Restricted",color:"#8847ff"},price:280.57,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_player_two_light_png.png"},
    {id:"fb149",name:"M4A1-S | Golden Coil (Field-Tested)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:314.62,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_aq_m4a1s_elegant_light_png.png"},
    {id:"fb150",name:"M4A1-S | Blue Phosphor (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:306.34,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_am_damascus_steel_light_png.png"},
    {id:"fb151",name:"M4A4 | Howl (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:319.9,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_howl_light_png.png"},
    {id:"fb152",name:"M4A4 | Poseidon (Field-Tested)",rarity:{name:"Covert",color:"#eb4b4b"},price:347.02,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_poseidon_light_png.png"},
    {id:"fb153",name:"M4A4 | Asiimov (Field-Tested)",rarity:{name:"Restricted",color:"#8847ff"},price:314.93,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_asiimov_light_png.png"},
    {id:"fb154",name:"M4A4 | The Emperor (Field-Tested)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:353.15,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_the_emperor_light_png.png"},
    {id:"fb155",name:"M4A4 | Desolate Space (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:343.86,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_desolate_space_light_png.png"},
    {id:"fb156",name:"Desert Eagle | Printstream (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:359.07,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_cu_deag_printstream_light_png.png"},
    {id:"fb157",name:"Desert Eagle | Blaze (Field-Tested)",rarity:{name:"Covert",color:"#eb4b4b"},price:389.51,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_aa_deagle_lightning_light_png.png"},
    {id:"fb158",name:"Desert Eagle | Code Red (Field-Tested)",rarity:{name:"Restricted",color:"#8847ff"},price:353.49,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_gs_deagle_code_red_light_png.png"},
    {id:"fb159",name:"Desert Eagle | Ocean Drive (Field-Tested)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:396.39,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_cu_deag_jacuzzi_light_png.png"},
    {id:"fb160",name:"Desert Eagle | Cobalt Disruption (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:385.96,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_aq_deagle_naga_light_png.png"},
    {id:"fb161",name:"Glock-18 | Vogue (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:403.04,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_eyecontact_light_png.png"},
    {id:"fb162",name:"Glock-18 | Gamma Doppler (Field-Tested)",rarity:{name:"Covert",color:"#eb4b4b"},price:437.21,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_gamma_doppler_light_png.png"},
    {id:"fb163",name:"Glock-18 | Bullet Queen (Field-Tested)",rarity:{name:"Restricted",color:"#8847ff"},price:396.78,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_bullet_queen_light_png.png"},
    {id:"fb164",name:"USP-S | Kill Confirmed (Field-Tested)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:444.93,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_krokos_light_png.png"},
    {id:"fb165",name:"USP-S | Printstream (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:433.22,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_printstream_light_png.png"},
    {id:"fb166",name:"USP-S | The Traitor (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:452.4,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_the_traitor_light_png.png"},
    {id:"fb167",name:"USP-S | Neo-Noir (Field-Tested)",rarity:{name:"Covert",color:"#eb4b4b"},price:490.75,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_neonoir_light_png.png"},
    {id:"fb168",name:"P250 | See Ya Later (Field-Tested)",rarity:{name:"Restricted",color:"#8847ff"},price:445.36,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_gs_p250_see_ya_later_light_png.png"},
    {id:"fb169",name:"P250 | Asiimov (Field-Tested)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:499.41,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_gs_p250_asiimov_light_png.png"},
    {id:"fb170",name:"P250 | Mehndi (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:486.27,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_am_p250_mehndi_light_png.png"},
    {id:"fb171",name:"FAMAS | Commemoration (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:507.79,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_famas_cu_famas_jinn_light_png.png"},
    {id:"fb172",name:"FAMAS | Roll Cage (Field-Tested)",rarity:{name:"Covert",color:"#eb4b4b"},price:550.84,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_famas_gs_famas_roll_cage_light_png.png"},
    {id:"fb173",name:"Galil AR | Chatterbox (Field-Tested)",rarity:{name:"Restricted",color:"#8847ff"},price:499.9,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_galilar_cu_galil_ak_chatterbox_light_png.png"},
    {id:"fb174",name:"Galil AR | Eco (Field-Tested)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:560.56,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_galilar_cu_galil_eco_light_png.png"},
    {id:"fb175",name:"SG 553 | Integrale (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:545.82,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_sg556_cu_sg553_integrale_light_png.png"},
    {id:"fb176",name:"SSG 08 | Dragonfire (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:569.97,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ssg08_cu_ssg08_dragonfire_light_png.png"},
    {id:"fb177",name:"SSG 08 | Bloodshot (Field-Tested)",rarity:{name:"Covert",color:"#eb4b4b"},price:618.29,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ssg08_cu_ssg08_bloodshot_light_png.png"},
    {id:"fb178",name:"MP9 | Starlight Protector (Field-Tested)",rarity:{name:"Restricted",color:"#8847ff"},price:561.11,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_mp9_cu_mp9_starlight_light_png.png"},
    {id:"fb179",name:"MAC-10 | Stalker (Field-Tested)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:629.2,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_mac10_gs_mac10_stalker_light_png.png"},
    {id:"fb180",name:"MP7 | Bloodsport (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:612.65,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_mp7_gs_mp7_bloodsport_light_png.png"},
    {id:"fb181",name:"P90 | Death by Kitty (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:639.76,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p90_cu_p90_scorpio_light_png.png"},
    {id:"fb182",name:"P90 | Asiimov (Field-Tested)",rarity:{name:"Covert",color:"#eb4b4b"},price:694.0,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p90_cu_p90_asiimov_light_png.png"},
    {id:"fb183",name:"Five-SeveN | Monkey Business (Field-Tested)",rarity:{name:"Restricted",color:"#8847ff"},price:629.82,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_fiveseven_gs_fiveseven_monkeybusiness_light_png.png"},
    {id:"fb184",name:"Five-SeveN | Hyper Beast (Field-Tested)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:706.25,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_fiveseven_gs_fiveseven_hyperbeast_light_png.png"},
    {id:"fb185",name:"Tec-9 | Fuel Injector (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:687.67,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_tec9_gs_tec9_fuel_injector_light_png.png"},
    {id:"fb186",name:"CZ75-Auto | Xiangliu (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:718.1,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_cz75a_gs_cz75a_chastizer_light_png.png"},
    {id:"fb187",name:"R8 Revolver | Fade (Field-Tested)",rarity:{name:"Covert",color:"#eb4b4b"},price:778.98,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_revolver_aa_revolver_fade_light_png.png"},
    {id:"fb188",name:"\u2605 Karambit | Doppler (Field-Tested)",rarity:{name:"Restricted",color:"#8847ff"},price:706.94,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_karambit_am_marble_fade_light_png.png"},
    {id:"fb189",name:"\u2605 Karambit | Fade (Field-Tested)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:792.73,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_karambit_aa_fade_light_png.png"},
    {id:"fb190",name:"\u2605 Butterfly Knife | Doppler (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:771.88,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_butterfly_am_marble_fade_light_png.png"},
    {id:"fb191",name:"\u2605 M9 Bayonet | Doppler (Field-Tested)",rarity:{name:"Classified",color:"#d32ce6"},price:806.04,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_m9_bayonet_am_marble_fade_light_png.png"},
    {id:"fb192",name:"\u2605 Sport Gloves | Vice (Field-Tested)",rarity:{name:"Covert",color:"#eb4b4b"},price:874.37,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/ct_gloves_sporty_militia_light_png.png"},
    {id:"fb193",name:"AK-47 | Redline (Well-Worn)",rarity:{name:"Restricted",color:"#8847ff"},price:793.5,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_redline_light_png.png"},
    {id:"fb194",name:"AK-47 | Asiimov (Well-Worn)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:889.8,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_asiimov_light_png.png"},
    {id:"fb195",name:"AK-47 | Vulcan (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:866.39,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_vulcan_light_png.png"},
    {id:"fb196",name:"AK-47 | Fire Serpent (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:904.74,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_fire_serpent_light_png.png"},
    {id:"fb197",name:"AK-47 | The Empress (Well-Worn)",rarity:{name:"Covert",color:"#eb4b4b"},price:981.43,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_gs_ak47_empress_light_png.png"},
    {id:"fb198",name:"AK-47 | Bloodsport (Well-Worn)",rarity:{name:"Restricted",color:"#8847ff"},price:890.67,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_gs_ak47_bloodsport_light_png.png"},
    {id:"fb199",name:"AK-47 | Neon Rider (Well-Worn)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:998.76,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_noriderr_light_png.png"},
    {id:"fb200",name:"AK-47 | Legion of Anubis (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:972.48,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_anubis_light_png.png"},
    {id:"fb201",name:"AK-47 | Inheritance (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:1015.52,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_inheritance_light_png.png"},
    {id:"fb202",name:"AK-47 | Head Shot (Well-Worn)",rarity:{name:"Covert",color:"#eb4b4b"},price:1101.61,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_headshot_light_png.png"},
    {id:"fb203",name:"AWP | Asiimov (Well-Worn)",rarity:{name:"Restricted",color:"#8847ff"},price:999.73,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_asimov_light_png.png"},
    {id:"fb204",name:"AWP | Dragon Lore (Well-Worn)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:1121.05,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_medieval_dragon_light_png.png"},
    {id:"fb205",name:"AWP | Lightning Strike (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:1091.56,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_am_lightning_strike_light_png.png"},
    {id:"fb206",name:"AWP | Wildfire (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:1139.87,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_wildfire_light_png.png"},
    {id:"fb207",name:"AWP | Hyper Beast (Well-Worn)",rarity:{name:"Covert",color:"#eb4b4b"},price:1236.5,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_hyper_beast_light_png.png"},
    {id:"fb208",name:"AWP | Containment Breach (Well-Worn)",rarity:{name:"Restricted",color:"#8847ff"},price:1122.15,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_containment_breach_light_png.png"},
    {id:"fb209",name:"AWP | Neo-Noir (Well-Worn)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:1258.33,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_neonoir_light_png.png"},
    {id:"fb210",name:"M4A1-S | Printstream (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:1225.23,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_printstream_light_png.png"},
    {id:"fb211",name:"M4A1-S | Hyper Beast (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:1279.45,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_hyperbeast_light_png.png"},
    {id:"fb212",name:"M4A1-S | Player Two (Well-Worn)",rarity:{name:"Covert",color:"#eb4b4b"},price:1387.91,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_player_two_light_png.png"},
    {id:"fb213",name:"M4A1-S | Golden Coil (Well-Worn)",rarity:{name:"Restricted",color:"#8847ff"},price:1259.56,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_aq_m4a1s_elegant_light_png.png"},
    {id:"fb214",name:"M4A1-S | Blue Phosphor (Well-Worn)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:1412.41,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_am_damascus_steel_light_png.png"},
    {id:"fb215",name:"M4A4 | Howl (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:1375.26,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_howl_light_png.png"},
    {id:"fb216",name:"M4A4 | Poseidon (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:1436.12,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_poseidon_light_png.png"},
    {id:"fb217",name:"M4A4 | Asiimov (Well-Worn)",rarity:{name:"Covert",color:"#eb4b4b"},price:1557.87,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_asiimov_light_png.png"},
    {id:"fb218",name:"M4A4 | The Emperor (Well-Worn)",rarity:{name:"Restricted",color:"#8847ff"},price:1413.79,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_the_emperor_light_png.png"},
    {id:"fb219",name:"M4A4 | Desolate Space (Well-Worn)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:1585.36,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_desolate_space_light_png.png"},
    {id:"fb220",name:"Desert Eagle | Printstream (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:1543.66,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_cu_deag_printstream_light_png.png"},
    {id:"fb221",name:"Desert Eagle | Blaze (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:1611.97,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_aa_deagle_lightning_light_png.png"},
    {id:"fb222",name:"Desert Eagle | Code Red (Well-Worn)",rarity:{name:"Covert",color:"#eb4b4b"},price:1748.63,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_gs_deagle_code_red_light_png.png"},
    {id:"fb223",name:"Desert Eagle | Ocean Drive (Well-Worn)",rarity:{name:"Restricted",color:"#8847ff"},price:1586.91,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_cu_deag_jacuzzi_light_png.png"},
    {id:"fb224",name:"Desert Eagle | Cobalt Disruption (Well-Worn)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:1779.49,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_aq_deagle_naga_light_png.png"},
    {id:"fb225",name:"Glock-18 | Vogue (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:1732.68,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_eyecontact_light_png.png"},
    {id:"fb226",name:"Glock-18 | Gamma Doppler (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:1809.36,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_gamma_doppler_light_png.png"},
    {id:"fb227",name:"Glock-18 | Bullet Queen (Well-Worn)",rarity:{name:"Covert",color:"#eb4b4b"},price:1962.75,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_bullet_queen_light_png.png"},
    {id:"fb228",name:"USP-S | Kill Confirmed (Well-Worn)",rarity:{name:"Restricted",color:"#8847ff"},price:1781.23,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_krokos_light_png.png"},
    {id:"fb229",name:"USP-S | Printstream (Well-Worn)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:1997.39,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_printstream_light_png.png"},
    {id:"fb230",name:"USP-S | The Traitor (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:1944.84,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_the_traitor_light_png.png"},
    {id:"fb231",name:"USP-S | Neo-Noir (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:2030.92,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_neonoir_light_png.png"},
    {id:"fb232",name:"P250 | See Ya Later (Well-Worn)",rarity:{name:"Covert",color:"#eb4b4b"},price:2203.09,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_gs_p250_see_ya_later_light_png.png"},
    {id:"fb233",name:"P250 | Asiimov (Well-Worn)",rarity:{name:"Restricted",color:"#8847ff"},price:1999.34,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_gs_p250_asiimov_light_png.png"},
    {id:"fb234",name:"P250 | Mehndi (Well-Worn)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:2241.97,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_am_p250_mehndi_light_png.png"},
    {id:"fb235",name:"FAMAS | Commemoration (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:2182.99,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_famas_cu_famas_jinn_light_png.png"},
    {id:"fb236",name:"FAMAS | Roll Cage (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:2279.6,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_famas_gs_famas_roll_cage_light_png.png"},
    {id:"fb237",name:"Galil AR | Chatterbox (Well-Worn)",rarity:{name:"Covert",color:"#eb4b4b"},price:2472.86,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_galilar_cu_galil_ak_chatterbox_light_png.png"},
    {id:"fb238",name:"Galil AR | Eco (Well-Worn)",rarity:{name:"Restricted",color:"#8847ff"},price:2244.16,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_galilar_cu_galil_eco_light_png.png"},
    {id:"fb239",name:"SG 553 | Integrale (Well-Worn)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:2516.5,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_sg556_cu_sg553_integrale_light_png.png"},
    {id:"fb240",name:"SSG 08 | Dragonfire (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:2450.3,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ssg08_cu_ssg08_dragonfire_light_png.png"},
    {id:"fb241",name:"SSG 08 | Bloodshot (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:2558.74,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ssg08_cu_ssg08_bloodshot_light_png.png"},
    {id:"fb242",name:"MP9 | Starlight Protector (Well-Worn)",rarity:{name:"Covert",color:"#eb4b4b"},price:2775.66,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_mp9_cu_mp9_starlight_light_png.png"},
    {id:"fb243",name:"MAC-10 | Stalker (Well-Worn)",rarity:{name:"Restricted",color:"#8847ff"},price:2518.96,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_mac10_gs_mac10_stalker_light_png.png"},
    {id:"fb244",name:"MP7 | Bloodsport (Well-Worn)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:2824.65,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_mp7_gs_mp7_bloodsport_light_png.png"},
    {id:"fb245",name:"P90 | Death by Kitty (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:2750.34,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p90_cu_p90_scorpio_light_png.png"},
    {id:"fb246",name:"P90 | Asiimov (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:2872.06,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p90_cu_p90_asiimov_light_png.png"},
    {id:"fb247",name:"Five-SeveN | Monkey Business (Well-Worn)",rarity:{name:"Covert",color:"#eb4b4b"},price:3115.54,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_fiveseven_gs_fiveseven_monkeybusiness_light_png.png"},
    {id:"fb248",name:"Five-SeveN | Hyper Beast (Well-Worn)",rarity:{name:"Restricted",color:"#8847ff"},price:2827.41,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_fiveseven_gs_fiveseven_hyperbeast_light_png.png"},
    {id:"fb249",name:"Tec-9 | Fuel Injector (Well-Worn)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:3170.53,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_tec9_gs_tec9_fuel_injector_light_png.png"},
    {id:"fb250",name:"CZ75-Auto | Xiangliu (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:3087.12,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_cz75a_gs_cz75a_chastizer_light_png.png"},
    {id:"fb251",name:"R8 Revolver | Fade (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:3223.75,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_revolver_aa_revolver_fade_light_png.png"},
    {id:"fb252",name:"\u2605 Karambit | Doppler (Well-Worn)",rarity:{name:"Covert",color:"#eb4b4b"},price:3497.04,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_karambit_am_marble_fade_light_png.png"},
    {id:"fb253",name:"\u2605 Karambit | Fade (Well-Worn)",rarity:{name:"Restricted",color:"#8847ff"},price:3173.63,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_karambit_aa_fade_light_png.png"},
    {id:"fb254",name:"\u2605 Butterfly Knife | Doppler (Well-Worn)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:3558.76,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_butterfly_am_marble_fade_light_png.png"},
    {id:"fb255",name:"\u2605 M9 Bayonet | Doppler (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:3465.14,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_knife_m9_bayonet_am_marble_fade_light_png.png"},
    {id:"fb256",name:"\u2605 Sport Gloves | Vice (Well-Worn)",rarity:{name:"Classified",color:"#d32ce6"},price:3618.5,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/ct_gloves_sporty_militia_light_png.png"},
    {id:"fb257",name:"AK-47 | Redline (Battle-Scarred)",rarity:{name:"Covert",color:"#eb4b4b"},price:3925.25,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_redline_light_png.png"},
    {id:"fb258",name:"AK-47 | Asiimov (Battle-Scarred)",rarity:{name:"Restricted",color:"#8847ff"},price:3562.24,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_asiimov_light_png.png"},
    {id:"fb259",name:"AK-47 | Vulcan (Battle-Scarred)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:3994.53,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_vulcan_light_png.png"},
    {id:"fb260",name:"AK-47 | Fire Serpent (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:3889.45,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_fire_serpent_light_png.png"},
    {id:"fb261",name:"AK-47 | The Empress (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:4061.59,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_gs_ak47_empress_light_png.png"},
    {id:"fb262",name:"AK-47 | Bloodsport (Battle-Scarred)",rarity:{name:"Covert",color:"#eb4b4b"},price:4405.9,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_gs_ak47_bloodsport_light_png.png"},
    {id:"fb263",name:"AK-47 | Neon Rider (Battle-Scarred)",rarity:{name:"Restricted",color:"#8847ff"},price:3998.44,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_noriderr_light_png.png"},
    {id:"fb264",name:"AK-47 | Legion of Anubis (Battle-Scarred)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:4483.67,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_anubis_light_png.png"},
    {id:"fb265",name:"AK-47 | Inheritance (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:4365.72,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_inheritance_light_png.png"},
    {id:"fb266",name:"AK-47 | Head Shot (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:4558.93,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_ak47_cu_ak47_headshot_light_png.png"},
    {id:"fb267",name:"AWP | Asiimov (Battle-Scarred)",rarity:{name:"Covert",color:"#eb4b4b"},price:4945.41,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_asimov_light_png.png"},
    {id:"fb268",name:"AWP | Dragon Lore (Battle-Scarred)",rarity:{name:"Restricted",color:"#8847ff"},price:4488.05,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_medieval_dragon_light_png.png"},
    {id:"fb269",name:"AWP | Lightning Strike (Battle-Scarred)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:5032.69,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_am_lightning_strike_light_png.png"},
    {id:"fb270",name:"AWP | Wildfire (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:4900.3,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_wildfire_light_png.png"},
    {id:"fb271",name:"AWP | Hyper Beast (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:5117.17,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_hyper_beast_light_png.png"},
    {id:"fb272",name:"AWP | Containment Breach (Battle-Scarred)",rarity:{name:"Covert",color:"#eb4b4b"},price:5550.98,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_containment_breach_light_png.png"},
    {id:"fb273",name:"AWP | Neo-Noir (Battle-Scarred)",rarity:{name:"Restricted",color:"#8847ff"},price:5037.61,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_awp_cu_awp_neonoir_light_png.png"},
    {id:"fb274",name:"M4A1-S | Printstream (Battle-Scarred)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:5648.95,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_printstream_light_png.png"},
    {id:"fb275",name:"M4A1-S | Hyper Beast (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:5500.35,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_hyperbeast_light_png.png"},
    {id:"fb276",name:"M4A1-S | Player Two (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:5743.77,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_cu_m4a1s_player_two_light_png.png"},
    {id:"fb277",name:"M4A1-S | Golden Coil (Battle-Scarred)",rarity:{name:"Covert",color:"#eb4b4b"},price:6230.7,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_aq_m4a1s_elegant_light_png.png"},
    {id:"fb278",name:"M4A1-S | Blue Phosphor (Battle-Scarred)",rarity:{name:"Restricted",color:"#8847ff"},price:5654.47,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4_silencer_am_damascus_steel_light_png.png"},
    {id:"fb279",name:"M4A4 | Howl (Battle-Scarred)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:6340.67,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_howl_light_png.png"},
    {id:"fb280",name:"M4A4 | Poseidon (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:6173.87,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_poseidon_light_png.png"},
    {id:"fb281",name:"M4A4 | Asiimov (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:6447.1,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_asiimov_light_png.png"},
    {id:"fb282",name:"M4A4 | The Emperor (Battle-Scarred)",rarity:{name:"Covert",color:"#eb4b4b"},price:6993.65,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_the_emperor_light_png.png"},
    {id:"fb283",name:"M4A4 | Desolate Space (Battle-Scarred)",rarity:{name:"Restricted",color:"#8847ff"},price:6346.87,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_m4a1_cu_m4a4_desolate_space_light_png.png"},
    {id:"fb284",name:"Desert Eagle | Printstream (Battle-Scarred)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:7117.08,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_cu_deag_printstream_light_png.png"},
    {id:"fb285",name:"Desert Eagle | Blaze (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:6929.86,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_aa_deagle_lightning_light_png.png"},
    {id:"fb286",name:"Desert Eagle | Code Red (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:7236.55,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_gs_deagle_code_red_light_png.png"},
    {id:"fb287",name:"Desert Eagle | Ocean Drive (Battle-Scarred)",rarity:{name:"Covert",color:"#eb4b4b"},price:7850.03,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_cu_deag_jacuzzi_light_png.png"},
    {id:"fb288",name:"Desert Eagle | Cobalt Disruption (Battle-Scarred)",rarity:{name:"Restricted",color:"#8847ff"},price:7124.04,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_deagle_aq_deagle_naga_light_png.png"},
    {id:"fb289",name:"Glock-18 | Vogue (Battle-Scarred)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:7988.58,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_eyecontact_light_png.png"},
    {id:"fb290",name:"Glock-18 | Gamma Doppler (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:7778.42,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_gamma_doppler_light_png.png"},
    {id:"fb291",name:"Glock-18 | Bullet Queen (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:8122.67,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_glock_cu_glock_bullet_queen_light_png.png"},
    {id:"fb292",name:"USP-S | Kill Confirmed (Battle-Scarred)",rarity:{name:"Covert",color:"#eb4b4b"},price:8811.27,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_krokos_light_png.png"},
    {id:"fb293",name:"USP-S | Printstream (Battle-Scarred)",rarity:{name:"Restricted",color:"#8847ff"},price:7996.39,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_printstream_light_png.png"},
    {id:"fb294",name:"USP-S | The Traitor (Battle-Scarred)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:8966.78,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_the_traitor_light_png.png"},
    {id:"fb295",name:"USP-S | Neo-Noir (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:8730.9,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_usp_silencer_cu_usp_neonoir_light_png.png"},
    {id:"fb296",name:"P250 | See Ya Later (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:9117.3,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_gs_p250_see_ya_later_light_png.png"},
    {id:"fb297",name:"P250 | Asiimov (Battle-Scarred)",rarity:{name:"Covert",color:"#eb4b4b"},price:9890.21,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_gs_p250_asiimov_light_png.png"},
    {id:"fb298",name:"P250 | Mehndi (Battle-Scarred)",rarity:{name:"Restricted",color:"#8847ff"},price:8975.55,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_p250_am_p250_mehndi_light_png.png"},
    {id:"fb299",name:"FAMAS | Commemoration (Battle-Scarred)",rarity:{name:"Extraordinary",color:"#eb4b4b"},price:10000,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_famas_cu_famas_jinn_light_png.png"},
    {id:"fb300",name:"FAMAS | Roll Cage (Battle-Scarred)",rarity:{name:"Classified",color:"#d32ce6"},price:9800.0,image:"https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/default_generated/weapon_famas_gs_famas_roll_cage_light_png.png"}
  ];

  const state = {
    skins: [],
    inventory: [],
    history: [],
    source: null,
    target: null,
    balance: Number(localStorage.getItem("lunex_balance") || 0),
    sound: localStorage.getItem("lunex_sound") !== "off",
    busy: false
  };

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const money = (n) => "$" + Number(n || 0).toFixed(2);

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c]));
  }

  function normalizeSkin(s, i) {
    return {
      id: s.id || "skin-" + i,
      name: s.name || "Unknown Skin",
      rarity: s.rarity?.name || "Restricted",
      color: s.rarity?.color || "#4b69ff",
      image: s.image || "",
      price: Number(s.price || (8 + ((i * 17) % 300))),
      market_hash_name: s.market_hash_name || s.name
    };
  }

  function save() {
    localStorage.setItem("lunex_balance", String(state.balance));
    localStorage.setItem("lunex_inventory", JSON.stringify(state.inventory.slice(-80)));
    localStorage.setItem("lunex_history", JSON.stringify(state.history.slice(-50)));
  }

  function load() {
    try {
      // New account baseline: the player starts with exactly $0.
      // The version flag resets old demo balances once after this update,
      // then preserves the balance normally on future page loads.
      const balanceVersion = "start-zero-v1";
      if (localStorage.getItem("lunex_balance_version") !== balanceVersion) {
        state.balance = 0;
        localStorage.setItem("lunex_balance_version", balanceVersion);
        localStorage.setItem("lunex_balance", "0");
      } else {
        state.balance = Number(localStorage.getItem("lunex_balance") || 0);
      }

      state.inventory = JSON.parse(localStorage.getItem("lunex_inventory") || "[]");
      state.history = JSON.parse(localStorage.getItem("lunex_history") || "[]");
      state.inventory = state.inventory.map((x, i) => ({...x, uid: x.uid || ("item-" + Date.now() + "-" + i + "-" + Math.random().toString(36).slice(2,8))}));
    } catch {
      state.inventory = [];
      state.history = [];
      state.balance = 0;
    }
  }

  function showToast(message) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    $("#toastStack").appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }

  function setBalance() {
    $("#balance").textContent = Math.floor(state.balance).toLocaleString("ru-RU");
  }

  function imageFallback(img) {
    img.onerror = () => {
      img.onerror = null;
      img.src = FALLBACK_IMAGE;
      img.style.opacity = ".15";
    };
  }

  function skinCard(skin, selectable = true, showSell = true) {
    const selected = state.source?.id === skin.id ? "selected" : "";
    return `<article class="skin-card ${selected}" data-skin-id="${escapeHtml(skin.id)}" data-item-uid="${escapeHtml(skin.uid || "")}" ${selectable ? "" : "data-static=\"1\""}>
      <div class="skin-image"><img src="${escapeHtml(skin.image)}" alt="${escapeHtml(skin.name)}" loading="lazy" onerror="this.style.opacity='.12'"></div>
      <div class="skin-name">${escapeHtml(skin.name)}</div>
      <div class="skin-meta">
        <span><i class="rarity-dot" style="background:${escapeHtml(skin.color)}"></i>${escapeHtml(skin.rarity)}</span>
        <b>${money(skin.price)}</b>
      </div>
      ${showSell ? `<button class="sell-item-btn" type="button" data-sell-id="${escapeHtml(skin.uid || skin.id)}">💰 Продать предмет</button>` : ""}
    </article>`;
  }

  function renderCatalog() {
    const box = $("#catalogGrid");
    if (!box) return;
    const q = ($("#catalogSearch")?.value || "").toLowerCase().trim();
    const list = state.skins.filter(s => !q || s.name.toLowerCase().includes(q)).slice(0, 300);
    box.innerHTML = list.length ? list.map(s => `
      <article class="skin-card catalog-card">
        <div class="skin-image"><img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.name)}" loading="lazy" onerror="this.style.opacity='.12'"></div>
        <div class="skin-name">${escapeHtml(s.name)}</div>
        <div class="skin-meta"><span><i class="rarity-dot" style="background:${escapeHtml(s.color)}"></i>${escapeHtml(s.rarity)}</span><b>${money(s.price)}</b></div>
        <button class="catalog-add-btn" type="button" data-catalog-id="${escapeHtml(s.id)}">＋ В инвентарь</button>
      </article>`).join("") : `<div class="empty-state">Скин не найден.</div>`;
    $$("#catalogGrid .catalog-add-btn").forEach(btn => btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const skin = state.skins.find(x => x.id === btn.dataset.catalogId);
      if (!skin) return;
      const copy = {...skin, uid:"catalog-" + Date.now() + "-" + Math.random().toString(36).slice(2,8)};
      state.inventory.push(copy);
      save();
      renderInventory();
      renderFullInventory();
      showToast("🎒 Скин добавлен", skin.name);
    }));
  }

  function renderInventory() {
    const q = ($("#searchInput")?.value || "").toLowerCase().trim();
    const rarity = $("#rarityFilter")?.value || "all";
    const list = state.inventory.filter(s =>
      (!q || s.name.toLowerCase().includes(q)) &&
      (rarity === "all" || s.rarity === rarity)
    );
    $("#inventoryGrid").innerHTML = list.length
      ? list.map(s => skinCard(s)).join("")
      : `<div class="empty-state">Инвентарь пуст. Выбери предмет из стартового набора или открой кейс.</div>`;
    $$("#inventoryGrid .skin-card").forEach(card => {
      card.addEventListener("click", () => {
        const skin = state.inventory.find(x => (card.dataset.itemUid && x.uid === card.dataset.itemUid) || x.id === card.dataset.skinId);
        if (skin) selectSource(skin);
      });
    });
  }

  function renderFullInventory() {
    const box = $("#fullInventoryGrid");
    if (!state.inventory.length) {
      box.innerHTML = `<div class="empty-state">Пока ничего нет.</div>`;
      return;
    }
    box.innerHTML = state.inventory.map(s => skinCard(s)).join("");
  }

  function renderHistory() {
    const box = $("#historyList");
    if (!state.history.length) {
      box.innerHTML = `<div class="empty-state">История появится после первого апгрейда.</div>`;
      return;
    }
    box.innerHTML = state.history.slice().reverse().map(h => `
      <div class="history-row">
        <img src="${escapeHtml(h.image)}" alt="" onerror="this.style.opacity='.1'">
        <div><div class="history-name">${escapeHtml(h.title)}</div><div class="history-sub">${escapeHtml(h.time)} · ${escapeHtml(h.type)}</div></div>
        <div class="${h.win ? "win" : "loss"}">${h.win ? "WIN" : "LOSS"}</div>
        <div class="history-price">${money(h.price)}</div>
      </div>`).join("");
  }

  function renderCases() {
    const cases = [
      {name:"Lunex Starter",price:15,icon:"📦",min:8,max:55},
      {name:"Blue Phantom",price:35,icon:"💠",min:20,max:130},
      {name:"Neon Rush",price:80,icon:"⚡",min:45,max:310},
      {name:"Lunex Black",price:180,icon:"🖤",min:100,max:850}
    ];
    $("#caseGrid").innerHTML = cases.map((c,i) => `
      <article class="case-card">
        <div class="case-art"><div class="case-box">${c.icon}</div></div>
        <h3>${c.name}</h3>
        <p>Возможный дроп: ${money(c.min)} — ${money(c.max)}</p>
        <button class="case-open" data-case="${i}">ОТКРЫТЬ · ${money(c.price)}</button>
      </article>`).join("");
    $$("#caseGrid .case-open").forEach(btn => btn.addEventListener("click", () => openCase(Number(btn.dataset.case))));
  }

  function selectSource(skin) {
    state.source = skin;
    renderSelected();
    renderInventory();
    calculate();
    showToast("Предмет выбран: " + skin.name);
  }

  function selectTarget(skin) {
    if (!state.source) return showToast("Сначала выбери предмет для апгрейда");
    if (skin.id === state.source.id) return showToast("Цель должна отличаться от исходного предмета");
    if (skin.price <= state.source.price) return showToast("Цель должна быть дороже исходного предмета");
    state.target = skin;
    renderSelected();
    calculate();
  }

  function sellSkin(itemUid) {
    const index = state.inventory.findIndex(item => item.uid === itemUid || item.id === itemUid);
    if (index === -1) {
      showToast("Предмет уже отсутствует в инвентаре");
      return;
    }

    const item = state.inventory[index];
    const payout = Number((Number(item.price || 0) * 0.90).toFixed(2));

    state.inventory.splice(index, 1);
    state.balance = Number((state.balance + payout).toFixed(2));

    if (state.source?.uid === item.uid) {
      state.source = null;
      state.target = null;
      renderSelected();
      calculate();
    }

    state.history.push({
      title: item.name,
      image: item.image,
      price: payout,
      win: true,
      type: "Продажа",
      time: new Date().toLocaleString("ru-RU")
    });

    save();
    setBalance();
    renderInventory();
    renderFullInventory();
    renderHistory();
    showToast("💰 Предмет продан", `${item.name} → +${money(payout)}`);
  }

  function selectedHtml(skin) {
    return `<div class="selected-item">
      <img src="${escapeHtml(skin.image)}" alt="${escapeHtml(skin.name)}">
      <div class="item-name">${escapeHtml(skin.name)}</div>
      <div class="item-price">${money(skin.price)}</div>
    </div>`;
  }

  function renderSelected() {
    $("#sourceSlot").innerHTML = state.source ? selectedHtml(state.source) : `<div class="slot-empty"><div class="plus">+</div><strong>Выберите предмет</strong><span>из инвентаря ниже</span></div>`;
    $("#targetSlot").innerHTML = state.target ? selectedHtml(state.target) : `<div class="slot-empty"><div class="plus">+</div><strong>Выберите цель</strong><span>цель должна быть дороже</span></div>`;
    $("#sourcePrice").textContent = money(state.source?.price);
    $("#targetPrice").textContent = money(state.target?.price);
  }

  function calculate() {
    const s = state.source, t = state.target;
    if (!s || !t || t.price <= s.price) {
      $("#chanceText").textContent = "0%";
      $("#chanceBar").style.width = "0%";
      $("#multiplier").textContent = "x0.00";
      $("#multiplierBig").textContent = "x0.00";
      $("#chanceHint").textContent = "Выберите два предмета";
      $("#upgradeBtn").disabled = true;
      $("#upgradeCost").textContent = "$0.00";
      return;
    }
    const mult = t.price / s.price;
    const chance = Math.min(95, Math.max(2, 100 / mult));
    $("#chanceText").textContent = chance.toFixed(2) + "%";
    $("#chanceBar").style.width = chance + "%";
    $("#multiplier").textContent = "x" + mult.toFixed(2);
    $("#multiplierBig").textContent = "x" + mult.toFixed(2);
    $("#chanceHint").textContent = chance < 10 ? "Очень рискованный апгрейд" : chance < 35 ? "Высокий риск" : "Нормальный шанс";
    $("#upgradeBtn").disabled = state.busy;
    $("#upgradeCost").textContent = money(s.price);
  }

  function chooseRandomTarget() {
    if (!state.source) return showToast("Сначала выбери исходный предмет");
    const options = state.skins.filter(s => s.price > state.source.price);
    if (!options.length) return showToast("Нет подходящих целей дороже " + money(state.source.price));
    const target = options[Math.floor(Math.random() * options.length)];
    state.target = target;
    renderSelected();
    calculate();
  }

  function playTone(success) {
    if (!state.sound) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = success ? 660 : 180;
      gain.gain.setValueAtTime(.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .18);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + .18);
    } catch {}
  }

  async function upgrade() {
    if (state.busy || !state.source || !state.target) return;
    const source = state.source, target = state.target;
    const chance = Math.min(95, Math.max(2, 100 / (target.price / source.price)));
    state.busy = true;
    $("#upgradeBtn").disabled = true;
    $("#upgradeBtn").classList.add("is-running");
    $("#upgradeBtn span:nth-child(2)").textContent = "ПРОВЕРКА...";
    showToast("Проверяем результат...");
    await new Promise(r => setTimeout(r, 1450));
    const win = Math.random() * 100 < chance;
    state.balance = Math.max(0, state.balance - source.price);
    if (win) {
      state.inventory = state.inventory.filter(x => x.id !== source.id);
      state.inventory.push({...target, uid:"upgrade-" + Date.now() + "-" + Math.random().toString(36).slice(2,8)});
      state.balance += target.price;
    } else {
      state.inventory = state.inventory.filter(x => x.id !== source.id);
    }
    state.history.push({title: win ? target.name : source.name,image:win ? target.image : source.image,price:win ? target.price : source.price,win,type:"Апгрейд",time:new Date().toLocaleString("ru-RU")});
    save(); setBalance(); renderInventory(); renderFullInventory(); renderHistory();
    playTone(win);
    showResult(win, win ? target : source, chance);
    state.source = null; state.target = null; renderSelected(); calculate();
    state.busy = false;
    $("#upgradeBtn").classList.remove("is-running");
    $("#upgradeBtn span:nth-child(2)").textContent = "UPGRADE";
  }

  function showResult(win, item, chance) {
    $("#resultLabel").textContent = win ? "⚡ УСПЕШНЫЙ АПГРЕЙД" : "💥 АПГРЕЙД НЕ УДАЛСЯ";
    $("#resultTitle").textContent = win ? "WIN" : "LOSS";
    $("#resultTitle").className = "result-title " + (win ? "win" : "loss");
    $("#resultItem").innerHTML = `<div><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}"><div class="result-name">${escapeHtml(item.name)}</div></div>`;
    $("#resultContinue").textContent = win ? "Забрать предмет" : "Закрыть";
    $("#resultModal").classList.add("open");
    $("#resultModal").setAttribute("aria-hidden","false");
  }

  function closeResult() {
    $("#resultModal").classList.remove("open");
    $("#resultModal").setAttribute("aria-hidden","true");
  }

  function openCase(index) {
    const configs = [
      {price:15,min:8,max:55},{price:35,min:20,max:130},{price:80,min:45,max:310},{price:180,min:100,max:850}
    ];
    const c = configs[index];
    if (state.balance < c.price) return showToast("Недостаточно виртуальных кредитов");
    state.balance -= c.price;
    setBalance();
    $("#caseModal").classList.add("open");
    $("#caseContinue").disabled = true;
    $("#caseResultTitle").textContent = "ОТКРЫВАЕМ...";
    const pool = state.skins.filter(s => s.price >= c.min && s.price <= c.max);
    const item = (pool.length ? pool : state.skins).slice().sort(() => Math.random() - .5)[0];
    const roll = $("#caseRoll");
    roll.innerHTML = `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">`;
    let n = 0;
    const timer = setInterval(() => {
      n++;
      roll.style.transform = `translateX(${Math.sin(n * .8) * 5}px)`;
      if (n > 18) {
        clearInterval(timer);
        roll.style.transform = "";
        state.inventory.push({...item, uid:"case-" + Date.now() + "-" + Math.random().toString(36).slice(2,8)});
        state.history.push({title:item.name,image:item.image,price:item.price,win:true,type:"Кейс",time:new Date().toLocaleString("ru-RU")});
        save(); renderInventory(); renderFullInventory(); renderHistory();
        $("#caseResultTitle").textContent = item.name;
        $("#caseContinue").disabled = false;
        showToast("Получен " + item.name);
      }
    }, 70);
  }

  function closeCase() {
    $("#caseModal").classList.remove("open");
  }

  function navigate(page) {
    $$(".page").forEach(p => p.classList.remove("active"));
    $(`#page-${page}`).classList.add("active");
    $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.nav === page));
    if (page === "inventory") { renderFullInventory(); bindPromo(); }
    if (page === "history") renderHistory();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  async function loadCatalog() {
    load();
    setBalance();
    if (state.inventory.length === 0) {
      state.inventory = FALLBACK_SKINS.slice(0,5).map((x,i) => ({...x, uid:"starter-" + Date.now() + "-" + i}));
      save();
    }
    try {
      const res = await fetch(API, {cache:"no-store"});
      if (!res.ok) throw new Error("API " + res.status);
      const data = await res.json();
      const normalized = data.map(normalizeSkin).filter(s => s.image && s.name && s.price >= 10 && s.price <= 10000);
      const byName = new Map();
      [...normalized, ...FALLBACK_SKINS].forEach(s => { if (!byName.has(s.name)) byName.set(s.name, s); });
      state.skins = [...byName.values()].sort((a,b) => a.price - b.price).slice(0, 300);
      if (state.skins.length < 300) {
        const extra = FALLBACK_SKINS.filter(s => !state.skins.some(x => x.id === s.id));
        state.skins = [...state.skins, ...extra].sort((a,b) => a.price - b.price).slice(0, 300);
      }
      $("#apiStatus").textContent = state.skins.length >= 300 ? "Каталог: 300 скинов" : "Каталог CS2 подключён";
      $("#apiStatus").parentElement.querySelector("i").style.background = "var(--green)";
    } catch (e) {
      state.skins = FALLBACK_SKINS.slice(0, 300);
      $("#apiStatus").textContent = "Каталог: 300 скинов";
      showToast("API недоступен — используется локальный каталог из 300 скинов");
    }
    // Keep inventory items in the target catalog.
    const known = new Map(state.skins.map(s => [s.id,s]));
    state.inventory = state.inventory.map(x => known.get(x.id) || x);
    renderInventory(); renderFullInventory(); renderCatalog(); renderHistory(); renderCases(); renderSelected(); calculate(); renderPromoStatus(); bindPromo();
  }

/* =========================
   LUNEX PROMO CODES
   ========================= */
const PROMO_CODES = {
  "LUNEX100": {amount:100, max:100},
  "LUNEX500": {amount:500, max:100},
  "LUNEX1000": {amount:1000, max:100},
  "LUNEX2500": {amount:2500, max:100}
};

function promoStorageKey(code){ return "lunex_promo_" + code; }

function redeemPromo(rawCode){
  const input = document.querySelector("#promoInput");
  const code = String(rawCode || "").trim().toUpperCase();
  if (!code) {
    showToast("Введите промокод");
    input?.focus();
    return false;
  }
  const promo = PROMO_CODES[code];
  if(!promo){
    showToast("❌ Промокод не найден");
    input?.classList.add("promo-error");
    setTimeout(() => input?.classList.remove("promo-error"), 500);
    return false;
  }
  const used = Number(localStorage.getItem(promoStorageKey(code)) || 0);
  if(used >= promo.max){
    showToast("⛔ Лимит активаций этого промокода исчерпан");
    return false;
  }
  state.balance = Number((state.balance + promo.amount).toFixed(2));
  localStorage.setItem(promoStorageKey(code), String(used + 1));
  save();
  setBalance();
  calculate();
  renderPromoStatus();
  if(input) input.value = "";
  showToast(`🎁 +${money(promo.amount)} зачислено`);
  return true;
}

function renderPromoStatus(){
  const box = document.querySelector("#promoStatus");
  if(!box) return;
  box.innerHTML = Object.entries(PROMO_CODES).map(([code,p])=>{
    const used=Number(localStorage.getItem(promoStorageKey(code))||0);
    return `<button type="button" class="promo-chip" data-promo-code="${code}"><b>${code}</b><span>+$${p.amount}</span></button>`;
  }).join("");
}

function bindPromo(){
  const input = document.querySelector("#promoInput");
  const button = document.querySelector("#promoBtn");
  if(!input || !button || button.dataset.bound === "1") return;
  button.dataset.bound = "1";
  button.addEventListener("click", () => redeemPromo(input.value));
  input.addEventListener("keydown", e => {
    if(e.key === "Enter") { e.preventDefault(); redeemPromo(input.value); }
  });
  document.querySelector("#promoStatus")?.addEventListener("click", e => {
    const chip = e.target.closest("[data-promo-code]");
    if(!chip) return;
    input.value = chip.dataset.promoCode;
    input.focus();
  });
}


  $$(".nav-btn").forEach(btn => btn.addEventListener("click", () => navigate(btn.dataset.nav)));
  $(".brand").addEventListener("click", e => {e.preventDefault();navigate("upgrade")});
  $("#clearSource").addEventListener("click", () => {state.source=null;state.target=null;renderSelected();calculate();renderInventory()});
  $("#randomTarget").addEventListener("click", chooseRandomTarget);
  $("#upgradeBtn").addEventListener("click", upgrade);
  $("#closeModal").addEventListener("click", closeResult);
  $("#resultContinue").addEventListener("click", closeResult);
  $("#closeCaseModal").addEventListener("click", closeCase);
  $("#caseContinue").addEventListener("click", closeCase);
  $("#searchInput").addEventListener("input", renderInventory);
  $("#rarityFilter").addEventListener("change", renderInventory);

  bindPromo();

  $("#soundBtn").addEventListener("click", () => {
    state.sound = !state.sound;
    localStorage.setItem("lunex_sound", state.sound ? "on" : "off");
    $("#soundBtn").textContent = state.sound ? "🔊" : "🔇";
  });
  $("#balanceBtn").addEventListener("click", () => {
    state.balance += 100;
    save(); setBalance(); calculate(); showToast("+100 виртуальных кредитов");
  });
  document.addEventListener("click", e => {
    const sellButton = e.target.closest(".sell-item-btn");
    if (!sellButton) return;
    e.preventDefault();
    e.stopPropagation();
    sellSkin(sellButton.dataset.sellId);
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeResult(); closeCase(); }
  });

  $("#soundBtn").textContent = state.sound ? "🔊" : "🔇";
  loadCatalog();
})();
