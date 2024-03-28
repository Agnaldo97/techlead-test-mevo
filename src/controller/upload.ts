import { Request, Response } from 'express';
import { File } from '../database/models/file';
import { FileProcess } from '../database/models/process_file';
const csv = require("fast-csv")
const mock = [
    {
      "from": 4713471018869,
      "to": 8470715754697,
      "amount": 131118230
    },
    {
      "from": 8595324109300,
      "to": 6641968030897,
      "amount": 497678140
    },
    {
      "from": 4453538018464,
      "to": 6816224035600,
      "amount": 591053498
    },
    {
      "from": 6825844446122,
      "to": 4920663629371,
      "amount": 756063440
    },
    {
      "from": 8100295860298,
      "to": 1077799124974,
      "amount": 635204935
    },
    {
      "from": 6216323835356,
      "to": 6331473669119,
      "amount": 281677021
    },
    {
      "from": 2392808881231,
      "to": 6107179159656,
      "amount": 705726479
    },
    {
      "from": 1218570144203,
      "to": 8961484413674,
      "amount": 158805802
    },
    {
      "from": 2715623473309,
      "to": 3626624335440,
      "amount": 803093969
    },
    {
      "from": 6012388866059,
      "to": 6103534387254,
      "amount": 562618536
    },
    {
      "from": 1709831683919,
      "to": 7429098581037,
      "amount": 433645678
    },
    {
      "from": 6356224692301,
      "to": 1629763258708,
      "amount": 875421426
    },
    {
      "from": 2988755831726,
      "to": 3878819803092,
      "amount": 245976586
    },
    {
      "from": 8337542979547,
      "to": 7284996539776,
      "amount": 855851113
    },
    {
      "from": 7421537620533,
      "to": 6021978139282,
      "amount": 4056818
    },
    {
      "from": 1383543572865,
      "to": 6946080413117,
      "amount": 652450538
    },
    {
      "from": 1094415955665,
      "to": 9005751545822,
      "amount": 548357275
    },
    {
      "from": 9963909876594,
      "to": 3466823560321,
      "amount": 646735060
    },
    {
      "from": 9823608385071,
      "to": 4094786436672,
      "amount": 289348331
    },
    {
      "from": 5900100397453,
      "to": 3857577809176,
      "amount": 735759518
    },
    {
      "from": 9726916878698,
      "to": 9041429597728,
      "amount": 833483167
    },
    {
      "from": 3815113955043,
      "to": 5435302845965,
      "amount": 987793405
    },
    {
      "from": 5417935130406,
      "to": 4149272635494,
      "amount": 832069721
    },
    {
      "from": 3894352296758,
      "to": 1835823068898,
      "amount": 732684347
    },
    {
      "from": 4495113406871,
      "to": 5379765842072,
      "amount": 912118283
    },
    {
      "from": 9202283665174,
      "to": 8084156880049,
      "amount": 322871477
    },
    {
      "from": 5318694346346,
      "to": 7426070282475,
      "amount": 858351453
    },
    {
      "from": 6729161774565,
      "to": 6149088057277,
      "amount": 859539472
    },
    {
      "from": 8476979070052,
      "to": 8661153716840,
      "amount": 772423811
    },
    {
      "from": 6396159849367,
      "to": 9055223767127,
      "amount": 365009181
    },
    {
      "from": 9482234188225,
      "to": 2661940171839,
      "amount": 342923802
    },
    {
      "from": 2294800310912,
      "to": 4807831418651,
      "amount": 797496831
    },
    {
      "from": 7956271955514,
      "to": 9586433401391,
      "amount": 175585977
    },
    {
      "from": 1709543848378,
      "to": 9726951930714,
      "amount": 796336762
    },
    {
      "from": 3300973180313,
      "to": 4060989355529,
      "amount": 226542712
    },
    {
      "from": 5646256477103,
      "to": 7726454506916,
      "amount": 936077547
    },
    {
      "from": 2368239301737,
      "to": 3019017749183,
      "amount": 450752881
    },
    {
      "from": 8861453325647,
      "to": 5029995300385,
      "amount": 957824958
    },
    {
      "from": 8908398227123,
      "to": 5936299491265,
      "amount": 586793038
    },
    {
      "from": 6432744089341,
      "to": 7934246073467,
      "amount": 91610922
    },
    {
      "from": 4187080718675,
      "to": 8581877044602,
      "amount": 204084699
    },
    {
      "from": 7798327114928,
      "to": 4138091927976,
      "amount": 120547933
    },
    {
      "from": 8171491496036,
      "to": 5243005407104,
      "amount": 300782510
    },
    {
      "from": 7509238940671,
      "to": 1466308446860,
      "amount": 646670086
    },
    {
      "from": 8949677304048,
      "to": 6311715642312,
      "amount": 291480787
    },
    {
      "from": 4479942766528,
      "to": 8262476696868,
      "amount": 543413633
    },
    {
      "from": 3799261731376,
      "to": 7099666677925,
      "amount": 230444272
    },
    {
      "from": 8128331338816,
      "to": 5349375236740,
      "amount": 882145653
    },
    {
      "from": 3995392118508,
      "to": 1458065215910,
      "amount": 320665342
    },
    {
      "from": 8226468223858,
      "to": 1952801663674,
      "amount": 228376477
    },
    {
      "from": 3882158512873,
      "to": 5756499567517,
      "amount": 319447439
    },
    {
      "from": 4048040331453,
      "to": 4501307791103,
      "amount": 927035881
    },
    {
      "from": 3081310200348,
      "to": 4667396984862,
      "amount": 292721976
    },
    {
      "from": 8769869207232,
      "to": 3719021640979,
      "amount": 48194580
    },
    {
      "from": 5005333271030,
      "to": 1360009813550,
      "amount": 893359708
    },
    {
      "from": 7069569984231,
      "to": 8018532640007,
      "amount": 260242579
    },
    {
      "from": 3513204911856,
      "to": 9157096429301,
      "amount": 550141923
    },
    {
      "from": 3467216161508,
      "to": 2343309202816,
      "amount": 863169135
    },
    {
      "from": 3431646436055,
      "to": 3646360564612,
      "amount": 558755433
    },
    {
      "from": 5446992820028,
      "to": 3912206977944,
      "amount": 950628833
    },
    {
      "from": 8680807513916,
      "to": 2369952268148,
      "amount": 943225958
    },
    {
      "from": 5701256142932,
      "to": 7773251216693,
      "amount": 950904426
    },
    {
      "from": 1112295713587,
      "to": 6276945185134,
      "amount": 523535117
    },
    {
      "from": 3758973159632,
      "to": 9851563551267,
      "amount": 391897991
    },
    {
      "from": 8084554547081,
      "to": 7147449082735,
      "amount": 522885523
    },
    {
      "from": 6569215104393,
      "to": 8714900824592,
      "amount": 252681474
    },
    {
      "from": 7770827199153,
      "to": 2736670999004,
      "amount": 236448719
    },
    {
      "from": 1134747803145,
      "to": 8703888896836,
      "amount": 793204052
    },
    {
      "from": 1823734313883,
      "to": 4885569964553,
      "amount": 955104985
    },
    {
      "from": 8679652841827,
      "to": 1645671264322,
      "amount": 297968785
    },
    {
      "from": 9435003072822,
      "to": 7542175043201,
      "amount": 113381637
    },
    {
      "from": 9589895955033,
      "to": 9152379097512,
      "amount": 2538670
    },
    {
      "from": 1984255896215,
      "to": 1696759617333,
      "amount": 924183090
    },
    {
      "from": 9226522898539,
      "to": 7670961438642,
      "amount": 103787677
    },
    {
      "from": 1584321077111,
      "to": 4577350608190,
      "amount": 180863640
    },
    {
      "from": 9875817712330,
      "to": 8358543887330,
      "amount": 442115922
    },
    {
      "from": 4689141160340,
      "to": 6820379331150,
      "amount": 499297797
    },
    {
      "from": 7416087964485,
      "to": 5174947110966,
      "amount": 219606374
    },
    {
      "from": 8354170396242,
      "to": 4539808390138,
      "amount": 759766727
    },
    {
      "from": 7832266989924,
      "to": 3650147278526,
      "amount": 827710167
    },
    {
      "from": 6053245403353,
      "to": 4121671815018,
      "amount": 93266914
    },
    {
      "from": 4247654161256,
      "to": 3918678028838,
      "amount": 474345119
    },
    {
      "from": 3257536380218,
      "to": 8615815871280,
      "amount": 559787856
    },
    {
      "from": 4024328001393,
      "to": 3880101895783,
      "amount": 919306003
    },
    {
      "from": 7911421231727,
      "to": 1409243020948,
      "amount": 79357944
    },
    {
      "from": 6401979175052,
      "to": 6591952872078,
      "amount": 155109446
    },
    {
      "from": 7037901481222,
      "to": 1668339561358,
      "amount": 62243765
    },
    {
      "from": 5756251391387,
      "to": 2078510436425,
      "amount": 641110900
    },
    {
      "from": 9582783789919,
      "to": 5158370417616,
      "amount": 215764466
    },
    {
      "from": 8911652522374,
      "to": 1283059813132,
      "amount": 581004534
    },
    {
      "from": 1539729738278,
      "to": 3826118964565,
      "amount": 635377738
    },
    {
      "from": 3433617289884,
      "to": 4033873111328,
      "amount": 198775405
    },
    {
      "from": 2548822588228,
      "to": 7957490170075,
      "amount": 954120622
    },
    {
      "from": 9613835682048,
      "to": 2655806139686,
      "amount": 32399017
    },
    {
      "from": 8316385947981,
      "to": 6365523371425,
      "amount": 731891123
    },
    {
      "from": 1605768536564,
      "to": 4377344026322,
      "amount": 625642848
    },
    {
      "from": 7125312908556,
      "to": 2655210633391,
      "amount": 645744434
    },
    {
      "from": 8958950360297,
      "to": 2706919694635,
      "amount": 481790478
    },
    {
      "from": 7737232636775,
      "to": 8030583752097,
      "amount": 146611117
    },
    {
      "from": 6243224524820,
      "to": 9390383637559,
      "amount": 281860115
    }
  ]
export const uploadFile = async (req: Request, res: Response) => {

    const body = mock;
    
    res.json("SUCESSO");
};
