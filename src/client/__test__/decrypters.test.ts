import { decryptGetAddressesResponse } from '../decrypters';

describe('encrypters', () => {
  test('decryptGetAddressesResponse should decrypt', () => {
    const encryptedResponse = Buffer.from([
      189,
      93,
      71,
      17,
      144,
      238,
      76,
      180,
      82,
      1,
      38,
      40,
      157,
      124,
      130,
      68,
      178,
      111,
      159,
      194,
      25,
      76,
      112,
      132,
      234,
      4,
      249,
      154,
      191,
      110,
      138,
      203,
      247,
      175,
      85,
      153,
      156,
      158,
      251,
      231,
      162,
      100,
      184,
      37,
      31,
      108,
      203,
      130,
      102,
      91,
      205,
      86,
      108,
      245,
      27,
      239,
      186,
      225,
      102,
      59,
      66,
      13,
      145,
      110,
      139,
      213,
      105,
      60,
      36,
      183,
      161,
      60,
      21,
      247,
      233,
      80,
      231,
      246,
      153,
      162,
      198,
      253,
      230,
      39,
      220,
      166,
      237,
      5,
      146,
      68,
      54,
      79,
      31,
      5,
      134,
      164,
      130,
      162,
      245,
      217,
      171,
      129,
      90,
      11,
      78,
      28,
      30,
      38,
      137,
      149,
      66,
      218,
      102,
      53,
      3,
      112,
      184,
      34,
      95,
      149,
      77,
      109,
      214,
      49,
      200,
      150,
      168,
      109,
      144,
      248,
      100,
      50,
      197,
      217,
      209,
      150,
      201,
      155,
      101,
      169,
      198,
      107,
      12,
      208,
      88,
      128,
      70,
      137,
      199,
      193,
      58,
      150,
      96,
      170,
      186,
      103,
      23,
      189,
      128,
      11,
      123,
      95,
      144,
      126,
      77,
      146,
      219,
      194,
      190,
      89,
      16,
      11,
      163,
      165,
      60,
      117,
      42,
      248,
      222,
      82,
      156,
      160,
      113,
      47,
      249,
      138,
      196,
      96,
      168,
      12,
      204,
      204,
      214,
      176,
      249,
      47,
      77,
      99,
      75,
      136,
      220,
      145,
      22,
      165,
      225,
      76,
      90,
      20,
      81,
      184,
      132,
      86,
      211,
      37,
      65,
      132,
      13,
      172,
      120,
      111,
      160,
      204,
      42,
      26,
      122,
      170,
      105,
      181,
      51,
      79,
      245,
      19,
      164,
      136,
      160,
      201,
      18,
      216,
      96,
      141,
      203,
      57,
      137,
      209,
      206,
      17,
      131,
      65,
      238,
      13,
      105,
      67,
      226,
      97,
      244,
      196,
      57,
      209,
      37,
      175,
      92,
      98,
      60,
      184,
      142,
      249,
      47,
      215,
      94,
      152,
      115,
      253,
      143,
      22,
      107,
      50,
      16,
      20,
      168,
      128,
      141,
      227,
      136,
      43,
      252,
      24,
      92,
      115,
      7,
      139,
      190,
      42,
      101,
      37,
      153,
      227,
      85,
      65,
      106,
      104,
      134,
      12,
      254,
      61,
      201,
      203,
      201,
      0,
      39,
      52,
      37,
      99,
      145,
      68,
      79,
      128,
      18,
      136,
      109,
      122,
      245,
      240,
      255,
      72,
      3,
      152,
      53,
      183,
      130,
      72,
      129,
      37,
      118,
      187,
      183,
      176,
      230,
      118,
      194,
      200,
      241,
      128,
      156,
      169,
      42,
      251,
      73,
      238,
      121,
      36,
      255,
      240,
      34,
      100,
      63,
      8,
      83,
      190,
      131,
      150,
      102,
      72,
      201,
      189,
      52,
      218,
      14,
      162,
      170,
      224,
      80,
      231,
      26,
      79,
      175,
      197,
      245,
      176,
      135,
      228,
      90,
      84,
      245,
      160,
      135,
      162,
      13,
      227,
      80,
      70,
      39,
      76,
      250,
      214,
      82,
      194,
      88,
      133,
      166,
      176,
      153,
      50,
      109,
      212,
      102,
      239,
      177,
      226,
      116,
      174,
      47,
      209,
      56,
      126,
      19,
      161,
      37,
      99,
      60,
      241,
      141,
      243,
      160,
      114,
      204,
      171,
      18,
      140,
      208,
      230,
      249,
      67,
      236,
      190,
      147,
      225,
      64,
      196,
      8,
      11,
      54,
      165,
      222,
      28,
      77,
      227,
      108,
      66,
      215,
      183,
      183,
      52,
      158,
      34,
      20,
      72,
      81,
      145,
      220,
      255,
      122,
      50,
      81,
      175,
      140,
      182,
      246,
      64,
      106,
      65,
      4,
      244,
      179,
      210,
      240,
      185,
      81,
      44,
      176,
      244,
      152,
      62,
      23,
      25,
      207,
      116,
      45,
      120,
      147,
      89,
      168,
      98,
      151,
      206,
      86,
      182,
      64,
      34,
      165,
      87,
      246,
      97,
      29,
      72,
      38,
      121,
      166,
      50,
      92,
      152,
      65,
      18,
      11,
      69,
      117,
      206,
      195,
      188,
      235,
      2,
      247,
      161,
      34,
      106,
      212,
      31,
      236,
      113,
      95,
      33,
      70,
      44,
      211,
      108,
      36,
      183,
      58,
      208,
      245,
      95,
      58,
      152,
      35,
      180,
      231,
      164,
      210,
      224,
      34,
      7,
      251,
      117,
      209,
      123,
      167,
      27,
      8,
      184,
      142,
      220,
      26,
      205,
      238,
      87,
      108,
      15,
      117,
      185,
      16,
      65,
      216,
      109,
      223,
      168,
      198,
      94,
      220,
      236,
      86,
      68,
      180,
      158,
      150,
      110,
      246,
      248,
      19,
      70,
      81,
      219,
      73,
      184,
      216,
      175,
      118,
      44,
      60,
      170,
      71,
      221,
      38,
      109,
      210,
      12,
      218,
      95,
      171,
      113,
      50,
      187,
      49,
      38,
      192,
      66,
      127,
      74,
      216,
      129,
      242,
      1,
      102,
      207,
      252,
      64,
      13,
      22,
      43,
      4,
      194,
      242,
      82,
      52,
      31,
      36,
      206,
      59,
      22,
      12,
      207,
      245,
      205,
      88,
      213,
      226,
      219,
      225,
      186,
      18,
      113,
      186,
      244,
      51,
      61,
      123,
      112,
      37,
      78,
      190,
      130,
      234,
      179,
      249,
      164,
      166,
      79,
      142,
      151,
      115,
      118,
      42,
      234,
      199,
      67,
      235,
      121,
      170,
      121,
      65,
      252,
      99,
      242,
      213,
      136,
      255,
      224,
      68,
      6,
      166,
      125,
      189,
      197,
      202,
      156,
      243,
      25,
      16,
      97,
      129,
      35,
      11,
      123,
      206,
      21,
      132,
      152,
      114,
      204,
      80,
      239,
      48,
      52,
      193,
      227,
      80,
      137,
      105,
      238,
      242,
      177,
      93,
      95,
      111,
      41,
      197,
      0,
      149,
      126,
      91,
      168,
      151,
      16,
      48,
      68,
      205,
      5,
      144,
      47,
      107,
      238,
      62,
      58,
      144,
      64,
      180,
      170,
      211,
      33,
      68,
      156,
      209,
      218,
      167,
      65,
      27,
      143,
      207,
      75,
      229,
      71,
      70,
      130,
      180,
      139,
      4,
      215,
      222,
      41,
      43,
      4,
      75,
      177,
      243,
      245,
      117,
      130,
      182,
      7,
      138,
      230,
      201,
      231,
      154,
      162,
      186,
      82,
      159,
      242,
      221,
      146,
      143,
      102,
      51,
      210,
      222,
      121,
      193,
      7,
      18,
      107,
      89,
      24,
      227,
      80,
      6,
      29,
      12,
      219,
      78,
      235,
      71,
      140,
      68,
      38,
      91,
      229,
      247,
      3,
      184,
      76,
      104,
      191,
      98,
      59,
      126,
      184,
      139,
      233,
      102,
      159,
      127,
      74,
      1,
      184,
      148,
      24,
      190,
      66,
      179,
      79,
      152,
      98,
      198,
      219,
      90,
      148,
      235,
      133,
      98,
      140,
      122,
      196,
      140,
      83,
      118,
      204,
      202,
      65,
      110,
      15,
      252,
      63,
      97,
      179,
      164,
      225,
      150,
      112,
      214,
      168,
      64,
      85,
      87,
      69,
      240,
      50,
      112,
      78,
      254,
      114,
      144,
      82,
      25,
      33,
      31,
      8,
      40,
      123,
      218,
      171,
      26,
      179,
      149,
      20,
      178,
      111,
      221,
      171,
      156,
      103,
      142,
      157,
      38,
      162,
      22,
      212,
      60,
      60,
      93,
      124,
      10,
      38,
      30,
      94,
      170,
      47,
      2,
      227,
      25,
      36,
      206,
      157,
      132,
      92,
      136,
      9,
      24,
      75,
      189,
      54,
      29,
      78,
      62,
      88,
      161,
      209,
      240,
      245,
      247,
      56,
      65,
      24,
      85,
      172,
      49,
      122,
      211,
      198,
      118,
      198,
      205,
      8,
      193,
      194,
      195,
      216,
      62,
      39,
      145,
      250,
      222,
      157,
      27,
      131,
      92,
      222,
      226,
      128,
      81,
      0,
      24,
      36,
      126,
      90,
      37,
      112,
      72,
      54,
      248,
      185,
      125,
      175,
      25,
      198,
      154,
      10,
      70,
      137,
      41,
      47,
      132,
      19,
      241,
      135,
      52,
      255,
      182,
      14,
      152,
      118,
      171,
      31,
      209,
      63,
      167,
      188,
      230,
      25,
      150,
      238,
      221,
      202,
      38,
      48,
      52,
      42,
      4,
      245,
      138,
      86,
      124,
      46,
      147,
      15,
      5,
      63,
      7,
      2,
      138,
      239,
      10,
      70,
      100,
      189,
      197,
      157,
      173,
      44,
      163,
      20,
      86,
      14,
      179,
      55,
      80,
      224,
      163,
      101,
      68,
      157,
      130,
      100,
      132,
      83,
      96,
      252,
      248,
      242,
      141,
      103,
      237,
      23,
      15,
      50,
      204,
      117,
      200,
      232,
      86,
      7,
      130,
      243,
      191,
      177,
      248,
      239,
      242,
      242,
      67,
      95,
      68,
      71,
      254,
      159,
      86,
      222,
      26,
      166,
      11,
      39,
      9,
      104,
      109,
      226,
      141,
      250,
      73,
      139,
      131,
      115,
      138,
      92,
      40,
      28,
      182,
      127,
      56,
      33,
      224,
      115,
      0,
      218,
      86,
      14,
      189,
      190,
      66,
      12,
      176,
      141,
      180,
      118,
      161,
      44,
      183,
      142,
      9,
      255,
      231,
      246,
      193,
      193,
      93,
      168,
      76,
      206,
      107,
      131,
      99,
      63,
      130,
      193,
      226,
      178,
      251,
      90,
      191,
      203,
      158,
      214,
      15,
      229,
      1,
      9,
      102,
      208,
      242,
      102,
      209,
      88,
      199,
      202,
      235,
      29,
      46,
      92,
      216,
      178,
      172,
      162,
      54,
      167,
      12,
      21,
      12,
      118,
      164,
      237,
      129,
      30,
      226,
      210,
      152,
      231,
      51,
      150,
      154,
      121,
      13,
      127,
      45,
      86,
      6,
      70,
      217,
      28,
      28,
      217,
      106,
      219,
      49,
      191,
      247,
      87,
      44,
      193,
      165,
      47,
      17,
      250,
      153,
      94,
      126,
      115,
      238,
      238,
      170,
      251,
      215,
      238,
      216,
      49,
      229,
      219,
      66,
      155,
      123,
      255,
      90,
      6,
      240,
      7,
      151,
      157,
      84,
      248,
      39,
      228,
      97,
      120,
      113,
      201,
      161,
      253,
      111,
      230,
      53,
      11,
      7,
      61,
      86,
      47,
      137,
      136,
      169,
      194,
      97,
      20,
      154,
      208,
      228,
      115,
      96,
      130,
      101,
      34,
      178,
      104,
      235,
      206,
      123,
      239,
      153,
      50,
      66,
      86,
      69,
      232,
      212,
      185,
      219,
      111,
      172,
      190,
      54,
      99,
      197,
      82,
      249,
      223,
      210,
      45,
      192,
      218,
      254,
      0,
      195,
      34,
      120,
      216,
      182,
      108,
      47,
      60,
      151,
      20,
      185,
      43,
      13,
      11,
      106,
      164,
      253,
      117,
      22,
      105,
      205,
      21,
      69,
      45,
      183,
      148,
      238,
      108,
      73,
      77,
      197,
      58,
      148,
      196,
      94,
      134,
      202,
      85,
      115,
      51,
      189,
      212,
      215,
      201,
      160,
      75,
      183,
      3,
      255,
      175,
      182,
      130,
      113,
      128,
      67,
      26,
      206,
      221,
      216,
      8,
      20,
      53,
      191,
      147,
      51,
      133,
      189,
      113,
      151,
      70,
      107,
      145,
      161,
      100,
      211,
      153,
      230,
      135,
      251,
      39,
      0,
      103,
      218,
      149,
      162,
      61,
      71,
      144,
      74,
      234,
      249,
      113,
      244,
      138,
      145,
      188,
      71,
      214,
      22,
      130,
      89,
      18,
      73,
      243,
      246,
      106,
      155,
      177,
      136,
      68,
      8,
      126,
      141,
      123,
      93,
      32,
      76,
      234,
      235,
      8,
      30,
      38,
      142,
      245,
      158,
      7,
      109,
      64,
      83,
      94,
      161,
      221,
      129,
      215,
      158,
      221,
      41,
      159,
      194,
      20,
      106,
      105,
      98,
      56,
      57,
      177,
      97,
      52,
      112,
      167,
      55,
      63,
      42,
      119,
      201,
      172,
      113,
      47,
      74,
      13,
      8,
      238,
      212,
      74,
      249,
      219,
      68,
      216,
      110,
      211,
      98,
      194,
      71,
      137,
      86,
      39,
      28,
      109,
      62,
      102,
      81,
      237,
      8,
      244,
      223,
      49,
      38,
      255,
      229,
      191,
      228,
      57,
      79,
      133,
      7,
      255,
      146,
      191,
      201,
      149,
      141,
      59,
      83,
      221,
      73,
      129,
      95,
      243,
      195,
      106,
      50,
      29,
      55,
      89,
      70,
      223,
      249,
      126,
      13,
      183,
      81,
      195,
      69,
      89,
      202,
      119,
      82,
      235,
      213,
      240,
      91,
      131,
      65,
      12,
      36,
      215,
      101,
      204,
      231,
      173,
      185,
      4,
      79,
      6,
      63,
      10,
      114,
      118,
      4,
      29,
      178,
      38,
      169,
      39,
      74,
      162,
      251,
      173,
      215,
      107,
      248,
      68,
      174,
      83,
      24,
      77,
      42,
      115,
      1,
      6,
      4,
      8,
      207,
      203,
      172,
      251,
      221,
      96,
      79,
      183,
      64,
      92,
      92,
      231,
      194,
      156,
      254,
      108,
      89,
      43,
      31,
      101,
      5,
      88,
      169,
      96,
      38,
      142,
      233,
      71,
      196,
      0,
      32,
      166,
      241,
      178,
      135,
      55,
      143,
      169,
      170,
      202,
      255,
      7,
      8,
      32,
      78,
      68,
      190,
      33,
      0,
      181,
      129,
      220,
      175,
      123,
      195,
      8,
      148,
      36,
      156,
      126,
      163,
      18,
      172,
      165,
      87,
      68,
      184,
      90,
      31,
      216,
      62,
      179,
      97,
      97,
      222,
      94,
      204,
      169,
      22,
      208,
      148,
      93,
      100,
      154,
      30,
      123,
      124,
      18,
      52,
      15,
      138,
      74,
      67,
      138,
      32,
      230,
      227,
      98,
      144,
      176,
      251,
      185,
      63,
      119,
      49,
      179,
      167,
      153,
      24,
      177,
      223,
      164,
      90,
      154,
      182,
      4,
      225,
      69,
      185,
      224,
      20,
      24,
      229,
      131,
      137,
      11,
      162,
      154,
      146,
      65,
      221,
      9,
      203,
      141,
      144,
      121,
      33,
      96,
      184,
      148,
      26,
      167,
      180,
      178,
      242,
      107,
      119,
      92,
      255,
      161,
      27,
      220,
      163,
      49,
      36,
      91,
      210,
      141,
      118,
      172,
      78,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ])
    const sharedSecret = Buffer.from([
      89,
      60,
      130,
      80,
      168,
      252,
      34,
      136,
      230,
      71,
      230,
      158,
      51,
      13,
      239,
      237,
      6,
      246,
      71,
      232,
      232,
      175,
      193,
      106,
      106,
      185,
      38,
      1,
      163,
      14,
      225,
      101
    ])
    expect(decryptGetAddressesResponse(encryptedResponse, sharedSecret)).toMatchSnapshot();
  });
});
