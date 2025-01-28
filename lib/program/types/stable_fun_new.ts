/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/stable_fun_new.json`.
 */
export type StableFunNew = {
    "address": "AxsQr2gYQksKWj8Xd4HSxXWDqpeRVYb9ow9ZerNWZoD",
    "metadata": {
      "name": "stableFunNew",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "initialize",
        "discriminator": [
          175,
          175,
          109,
          31,
          13,
          152,
          155,
          237
        ],
        "accounts": [
          {
            "name": "authority",
            "writable": true,
            "signer": true
          },
          {
            "name": "stablecoinMint",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    115,
                    116,
                    97,
                    98,
                    108,
                    101,
                    99,
                    111,
                    105,
                    110
                  ]
                },
                {
                  "kind": "account",
                  "path": "authority"
                },
                {
                  "kind": "arg",
                  "path": "symbol"
                }
              ]
            }
          },
          {
            "name": "tokenMint",
            "writable": true,
            "signer": true
          },
          {
            "name": "mintAuthority",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    105,
                    110,
                    116,
                    45,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                  ]
                },
                {
                  "kind": "account",
                  "path": "stablecoinMint"
                }
              ]
            }
          },
          {
            "name": "stablebondMint",
            "writable": true
          },
          {
            "name": "vault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "stablecoinMint"
                }
              ]
            }
          },
          {
            "name": "vaultTokenAccount",
            "writable": true,
            "signer": true
          },
          {
            "name": "priceFeed",
            "docs": [
              "Switchboard V3 aggregator account"
            ]
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "rent",
            "address": "SysvarRent111111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "targetCurrency",
            "type": "string"
          },
          {
            "name": "initialSupply",
            "type": "u64"
          }
        ]
      },
      {
        "name": "mint",
        "discriminator": [
          51,
          57,
          225,
          47,
          182,
          146,
          137,
          166
        ],
        "accounts": [
          {
            "name": "user",
            "writable": true,
            "signer": true
          },
          {
            "name": "stablecoinMint",
            "writable": true
          },
          {
            "name": "vault",
            "writable": true
          },
          {
            "name": "tokenMint",
            "writable": true
          },
          {
            "name": "userTokenAccount",
            "writable": true
          },
          {
            "name": "userStablebondAccount",
            "writable": true
          },
          {
            "name": "vaultStablebondAccount",
            "writable": true
          },
          {
            "name": "priceFeed",
            "docs": [
              "The Switchboard V3 aggregator account"
            ]
          },
          {
            "name": "mintAuthority",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    105,
                    110,
                    116,
                    45,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                  ]
                },
                {
                  "kind": "account",
                  "path": "stablecoinMint"
                }
              ]
            }
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "redeem",
        "discriminator": [
          184,
          12,
          86,
          149,
          70,
          196,
          97,
          225
        ],
        "accounts": [
          {
            "name": "user",
            "writable": true,
            "signer": true
          },
          {
            "name": "stablecoinMint",
            "writable": true
          },
          {
            "name": "vault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "stablecoinMint"
                }
              ]
            }
          },
          {
            "name": "tokenMint",
            "writable": true
          },
          {
            "name": "userTokenAccount",
            "writable": true
          },
          {
            "name": "userStablebondAccount",
            "writable": true
          },
          {
            "name": "vaultStablebondAccount",
            "writable": true
          },
          {
            "name": "priceFeed",
            "docs": [
              "The Switchboard V3 aggregator account"
            ]
          },
          {
            "name": "burnAuthority",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    105,
                    110,
                    116,
                    45,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                  ]
                },
                {
                  "kind": "account",
                  "path": "stablecoinMint"
                }
              ]
            }
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "updateSettings",
        "discriminator": [
          81,
          166,
          51,
          213,
          158,
          84,
          157,
          108
        ],
        "accounts": [
          {
            "name": "authority",
            "writable": true,
            "signer": true
          },
          {
            "name": "stablecoinMint",
            "writable": true
          }
        ],
        "args": [
          {
            "name": "params",
            "type": {
              "defined": {
                "name": "updateSettingsParams"
              }
            }
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "aggregatorAccountData",
        "discriminator": [
          217,
          230,
          65,
          101,
          201,
          162,
          27,
          125
        ]
      },
      {
        "name": "stablecoinMint",
        "discriminator": [
          43,
          188,
          66,
          1,
          31,
          38,
          18,
          30
        ]
      },
      {
        "name": "stablecoinVault",
        "discriminator": [
          87,
          94,
          250,
          148,
          26,
          113,
          176,
          219
        ]
      }
    ],
    "events": [
      {
        "name": "metadataUpdateEvent",
        "discriminator": [
          177,
          43,
          42,
          114,
          177,
          124,
          1,
          75
        ]
      },
      {
        "name": "mintEvent",
        "discriminator": [
          197,
          144,
          146,
          149,
          66,
          164,
          95,
          16
        ]
      },
      {
        "name": "redeemEvent",
        "discriminator": [
          90,
          114,
          83,
          146,
          212,
          26,
          217,
          59
        ]
      },
      {
        "name": "settingsUpdateEvent",
        "discriminator": [
          179,
          208,
          34,
          119,
          178,
          25,
          247,
          44
        ]
      },
      {
        "name": "stablecoinInitialized",
        "discriminator": [
          238,
          217,
          135,
          14,
          147,
          33,
          221,
          169
        ]
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "unauthorizedUpdate",
        "msg": "Unauthorized update attempt"
      },
      {
        "code": 6001,
        "name": "invalidCollateralRatio",
        "msg": "Invalid collateral ratio"
      },
      {
        "code": 6002,
        "name": "invalidFee",
        "msg": "Invalid fee percentage"
      },
      {
        "code": 6003,
        "name": "invalidMaxSupply",
        "msg": "Invalid max supply"
      },
      {
        "code": 6004,
        "name": "invalidName",
        "msg": "Invalid name"
      },
      {
        "code": 6005,
        "name": "invalidSymbol",
        "msg": "Invalid symbol"
      }
    ],
    "types": [
      {
        "name": "aggregatorAccountData",
        "serialization": "bytemuckunsafe",
        "repr": {
          "kind": "rust",
          "packed": true
        },
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "name",
              "docs": [
                "Name of the aggregator to store on-chain."
              ],
              "type": {
                "array": [
                  "u8",
                  32
                ]
              }
            },
            {
              "name": "metadata",
              "docs": [
                "Metadata of the aggregator to store on-chain."
              ],
              "type": {
                "array": [
                  "u8",
                  128
                ]
              }
            },
            {
              "name": "reserved1",
              "docs": [
                "Reserved."
              ],
              "type": {
                "array": [
                  "u8",
                  32
                ]
              }
            },
            {
              "name": "queuePubkey",
              "docs": [
                "Pubkey of the queue the aggregator belongs to."
              ],
              "type": "pubkey"
            },
            {
              "name": "oracleRequestBatchSize",
              "docs": [
                "CONFIGS",
                "Number of oracles assigned to an update request."
              ],
              "type": "u32"
            },
            {
              "name": "minOracleResults",
              "docs": [
                "Minimum number of oracle responses required before a round is validated."
              ],
              "type": "u32"
            },
            {
              "name": "minJobResults",
              "docs": [
                "Minimum number of job results before an oracle accepts a result."
              ],
              "type": "u32"
            },
            {
              "name": "minUpdateDelaySeconds",
              "docs": [
                "Minimum number of seconds required between aggregator rounds."
              ],
              "type": "u32"
            },
            {
              "name": "startAfter",
              "docs": [
                "Unix timestamp for which no feed update will occur before."
              ],
              "type": "i64"
            },
            {
              "name": "varianceThreshold",
              "docs": [
                "Change percentage required between a previous round and the current round. If variance percentage is not met, reject new oracle responses."
              ],
              "type": {
                "defined": {
                  "name": "switchboardDecimal"
                }
              }
            },
            {
              "name": "forceReportPeriod",
              "docs": [
                "Number of seconds for which, even if the variance threshold is not passed, accept new responses from oracles."
              ],
              "type": "i64"
            },
            {
              "name": "expiration",
              "docs": [
                "Timestamp when the feed is no longer needed."
              ],
              "type": "i64"
            },
            {
              "name": "consecutiveFailureCount",
              "docs": [
                "Counter for the number of consecutive failures before a feed is removed from a queue. If set to 0, failed feeds will remain on the queue."
              ],
              "type": "u64"
            },
            {
              "name": "nextAllowedUpdateTime",
              "docs": [
                "Timestamp when the next update request will be available."
              ],
              "type": "i64"
            },
            {
              "name": "isLocked",
              "docs": [
                "Flag for whether an aggregators configuration is locked for editing."
              ],
              "type": "bool"
            },
            {
              "name": "crankPubkey",
              "docs": [
                "Optional, public key of the crank the aggregator is currently using. Event based feeds do not need a crank."
              ],
              "type": "pubkey"
            },
            {
              "name": "latestConfirmedRound",
              "docs": [
                "Latest confirmed update request result that has been accepted as valid."
              ],
              "type": {
                "defined": {
                  "name": "aggregatorRound"
                }
              }
            },
            {
              "name": "currentRound",
              "docs": [
                "Oracle results from the current round of update request that has not been accepted as valid yet."
              ],
              "type": {
                "defined": {
                  "name": "aggregatorRound"
                }
              }
            },
            {
              "name": "jobPubkeysData",
              "docs": [
                "List of public keys containing the job definitions for how data is sourced off-chain by oracles."
              ],
              "type": {
                "array": [
                  "pubkey",
                  16
                ]
              }
            },
            {
              "name": "jobHashes",
              "docs": [
                "Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment."
              ],
              "type": {
                "array": [
                  {
                    "defined": {
                      "name": "hash"
                    }
                  },
                  16
                ]
              }
            },
            {
              "name": "jobPubkeysSize",
              "docs": [
                "Number of jobs assigned to an oracle."
              ],
              "type": "u32"
            },
            {
              "name": "jobsChecksum",
              "docs": [
                "Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment."
              ],
              "type": {
                "array": [
                  "u8",
                  32
                ]
              }
            },
            {
              "name": "authority",
              "docs": [
                "The account delegated as the authority for making account changes."
              ],
              "type": "pubkey"
            },
            {
              "name": "historyBuffer",
              "docs": [
                "Optional, public key of a history buffer account storing the last N accepted results and their timestamps."
              ],
              "type": "pubkey"
            },
            {
              "name": "previousConfirmedRoundResult",
              "docs": [
                "The previous confirmed round result."
              ],
              "type": {
                "defined": {
                  "name": "switchboardDecimal"
                }
              }
            },
            {
              "name": "previousConfirmedRoundSlot",
              "docs": [
                "The slot when the previous confirmed round was opened."
              ],
              "type": "u64"
            },
            {
              "name": "disableCrank",
              "docs": [
                "Whether an aggregator is permitted to join a crank."
              ],
              "type": "bool"
            },
            {
              "name": "jobWeights",
              "docs": [
                "Job weights used for the weighted median of the aggregator's assigned job accounts."
              ],
              "type": {
                "array": [
                  "u8",
                  16
                ]
              }
            },
            {
              "name": "creationTimestamp",
              "docs": [
                "Unix timestamp when the feed was created."
              ],
              "type": "i64"
            },
            {
              "name": "resolutionMode",
              "docs": [
                "Use sliding window or round based resolution",
                "NOTE: This changes result propogation in latest_round_result"
              ],
              "type": {
                "defined": {
                  "name": "aggregatorResolutionMode"
                }
              }
            },
            {
              "name": "basePriorityFee",
              "type": "u32"
            },
            {
              "name": "priorityFeeBump",
              "type": "u32"
            },
            {
              "name": "priorityFeeBumpPeriod",
              "type": "u32"
            },
            {
              "name": "maxPriorityFeeMultiplier",
              "type": "u32"
            },
            {
              "name": "parentFunction",
              "type": "pubkey"
            },
            {
              "name": "ebuf",
              "docs": [
                "Reserved for future info."
              ],
              "type": {
                "array": [
                  "u8",
                  90
                ]
              }
            }
          ]
        }
      },
      {
        "name": "aggregatorResolutionMode",
        "repr": {
          "kind": "rust"
        },
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "modeRoundResolution"
            },
            {
              "name": "modeSlidingResolution"
            }
          ]
        }
      },
      {
        "name": "aggregatorRound",
        "serialization": "bytemuckunsafe",
        "repr": {
          "kind": "rust",
          "packed": true
        },
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "numSuccess",
              "docs": [
                "Maintains the number of successful responses received from nodes.",
                "Nodes can submit one successful response per round."
              ],
              "type": "u32"
            },
            {
              "name": "numError",
              "docs": [
                "Number of error responses."
              ],
              "type": "u32"
            },
            {
              "name": "isClosed",
              "docs": [
                "Whether an update request round has ended."
              ],
              "type": "bool"
            },
            {
              "name": "roundOpenSlot",
              "docs": [
                "Maintains the `solana_program::clock::Slot` that the round was opened at."
              ],
              "type": "u64"
            },
            {
              "name": "roundOpenTimestamp",
              "docs": [
                "Maintains the `solana_program::clock::UnixTimestamp;` the round was opened at."
              ],
              "type": "i64"
            },
            {
              "name": "result",
              "docs": [
                "Maintains the current median of all successful round responses."
              ],
              "type": {
                "defined": {
                  "name": "switchboardDecimal"
                }
              }
            },
            {
              "name": "stdDeviation",
              "docs": [
                "Standard deviation of the accepted results in the round."
              ],
              "type": {
                "defined": {
                  "name": "switchboardDecimal"
                }
              }
            },
            {
              "name": "minResponse",
              "docs": [
                "Maintains the minimum node response this round."
              ],
              "type": {
                "defined": {
                  "name": "switchboardDecimal"
                }
              }
            },
            {
              "name": "maxResponse",
              "docs": [
                "Maintains the maximum node response this round."
              ],
              "type": {
                "defined": {
                  "name": "switchboardDecimal"
                }
              }
            },
            {
              "name": "oraclePubkeysData",
              "docs": [
                "Pubkeys of the oracles fulfilling this round."
              ],
              "type": {
                "array": [
                  "pubkey",
                  16
                ]
              }
            },
            {
              "name": "mediansData",
              "docs": [
                "Represents all successful node responses this round. `NaN` if empty."
              ],
              "type": {
                "array": [
                  {
                    "defined": {
                      "name": "switchboardDecimal"
                    }
                  },
                  16
                ]
              }
            },
            {
              "name": "currentPayout",
              "docs": [
                "Current rewards/slashes oracles have received this round."
              ],
              "type": {
                "array": [
                  "i64",
                  16
                ]
              }
            },
            {
              "name": "mediansFulfilled",
              "docs": [
                "Keep track of which responses are fulfilled here."
              ],
              "type": {
                "array": [
                  "bool",
                  16
                ]
              }
            },
            {
              "name": "errorsFulfilled",
              "docs": [
                "Keeps track of which errors are fulfilled here."
              ],
              "type": {
                "array": [
                  "bool",
                  16
                ]
              }
            }
          ]
        }
      },
      {
        "name": "hash",
        "serialization": "bytemuckunsafe",
        "repr": {
          "kind": "rust",
          "packed": true
        },
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "data",
              "docs": [
                "The bytes used to derive the hash."
              ],
              "type": {
                "array": [
                  "u8",
                  32
                ]
              }
            }
          ]
        }
      },
      {
        "name": "metadataUpdateEvent",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "stablecoinMint",
              "type": "pubkey"
            },
            {
              "name": "authority",
              "type": "pubkey"
            },
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "symbol",
              "type": "string"
            },
            {
              "name": "timestamp",
              "type": "i64"
            }
          ]
        }
      },
      {
        "name": "mintEvent",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "stablecoinMint",
              "type": "pubkey"
            },
            {
              "name": "user",
              "type": "pubkey"
            },
            {
              "name": "amount",
              "type": "u64"
            },
            {
              "name": "feeAmount",
              "type": "u64"
            },
            {
              "name": "collateralAmount",
              "type": "u64"
            },
            {
              "name": "timestamp",
              "type": "i64"
            }
          ]
        }
      },
      {
        "name": "redeemEvent",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "stablecoinMint",
              "type": "pubkey"
            },
            {
              "name": "user",
              "type": "pubkey"
            },
            {
              "name": "amount",
              "type": "u64"
            },
            {
              "name": "feeAmount",
              "type": "u64"
            },
            {
              "name": "collateralAmount",
              "type": "u64"
            },
            {
              "name": "timestamp",
              "type": "i64"
            }
          ]
        }
      },
      {
        "name": "settingsUpdateEvent",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "stablecoinMint",
              "type": "pubkey"
            },
            {
              "name": "authority",
              "type": "pubkey"
            },
            {
              "name": "oldSettings",
              "type": {
                "defined": {
                  "name": "stablecoinSettings"
                }
              }
            },
            {
              "name": "newSettings",
              "type": {
                "defined": {
                  "name": "stablecoinSettings"
                }
              }
            },
            {
              "name": "timestamp",
              "type": "i64"
            }
          ]
        }
      },
      {
        "name": "stablecoinInitialized",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "stablecoinMint",
              "type": "pubkey"
            },
            {
              "name": "authority",
              "type": "pubkey"
            },
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "symbol",
              "type": "string"
            },
            {
              "name": "targetCurrency",
              "type": "string"
            },
            {
              "name": "timestamp",
              "type": "i64"
            }
          ]
        }
      },
      {
        "name": "stablecoinMint",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "authority",
              "docs": [
                "The authority who can update settings"
              ],
              "type": "pubkey"
            },
            {
              "name": "name",
              "docs": [
                "Name of the stablecoin"
              ],
              "type": "string"
            },
            {
              "name": "symbol",
              "docs": [
                "Symbol of the stablecoin (e.g., \"USDX\")"
              ],
              "type": "string"
            },
            {
              "name": "targetCurrency",
              "docs": [
                "Target fiat currency (e.g., \"USD\", \"MXN\")"
              ],
              "type": "string"
            },
            {
              "name": "tokenMint",
              "docs": [
                "The SPL token mint address"
              ],
              "type": "pubkey"
            },
            {
              "name": "stablebondMint",
              "docs": [
                "The stablebond token mint used as collateral"
              ],
              "type": "pubkey"
            },
            {
              "name": "priceFeed",
              "docs": [
                "The oracle feed for price data"
              ],
              "type": "pubkey"
            },
            {
              "name": "vault",
              "docs": [
                "Vault holding the collateral"
              ],
              "type": "pubkey"
            },
            {
              "name": "currentSupply",
              "docs": [
                "Current supply of the stablecoin"
              ],
              "type": "u64"
            },
            {
              "name": "settings",
              "docs": [
                "Configuration settings"
              ],
              "type": {
                "defined": {
                  "name": "stablecoinSettings"
                }
              }
            },
            {
              "name": "stats",
              "docs": [
                "Statistics and metrics"
              ],
              "type": {
                "defined": {
                  "name": "stablecoinStats"
                }
              }
            },
            {
              "name": "createdAt",
              "docs": [
                "Timestamp when the stablecoin was created"
              ],
              "type": "i64"
            },
            {
              "name": "lastUpdated",
              "docs": [
                "Last time settings were updated"
              ],
              "type": "i64"
            }
          ]
        }
      },
      {
        "name": "stablecoinSettings",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "feeBasisPoints",
              "docs": [
                "Fee in basis points (1/10000)"
              ],
              "type": "u16"
            },
            {
              "name": "maxSupply",
              "docs": [
                "Maximum supply of stablecoins"
              ],
              "type": "u64"
            },
            {
              "name": "minCollateralRatio",
              "docs": [
                "Minimum collateral ratio (e.g. 150%)"
              ],
              "type": "u16"
            },
            {
              "name": "mintPaused",
              "docs": [
                "Whether minting is paused"
              ],
              "type": "bool"
            },
            {
              "name": "redeemPaused",
              "docs": [
                "Whether redeeming is paused"
              ],
              "type": "bool"
            }
          ]
        }
      },
      {
        "name": "stablecoinStats",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "totalMinted",
              "docs": [
                "Total amount of stablecoins minted"
              ],
              "type": "u64"
            },
            {
              "name": "totalBurned",
              "docs": [
                "Total amount of stablecoins burned"
              ],
              "type": "u64"
            },
            {
              "name": "totalFees",
              "docs": [
                "Total fees collected"
              ],
              "type": "u64"
            },
            {
              "name": "holderCount",
              "docs": [
                "Number of unique holders"
              ],
              "type": "u32"
            },
            {
              "name": "reserved",
              "docs": [
                "Reserved for future use"
              ],
              "type": {
                "array": [
                  "u8",
                  24
                ]
              }
            }
          ]
        }
      },
      {
        "name": "stablecoinVault",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "stablecoinMint",
              "type": "pubkey"
            },
            {
              "name": "authority",
              "type": "pubkey"
            },
            {
              "name": "collateralAccount",
              "type": "pubkey"
            },
            {
              "name": "totalCollateral",
              "type": "u64"
            },
            {
              "name": "totalValueLocked",
              "type": "u64"
            },
            {
              "name": "currentRatio",
              "type": "u16"
            },
            {
              "name": "lastDepositTime",
              "type": "i64"
            },
            {
              "name": "lastWithdrawalTime",
              "type": "i64"
            },
            {
              "name": "depositCount",
              "type": "u32"
            },
            {
              "name": "withdrawalCount",
              "type": "u32"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "switchboardDecimal",
        "serialization": "bytemuckunsafe",
        "repr": {
          "kind": "rust",
          "packed": true
        },
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "mantissa",
              "docs": [
                "The part of a floating-point number that represents the significant digits of that number, and that is multiplied by the base, 10, raised to the power of scale to give the actual value of the number."
              ],
              "type": "i128"
            },
            {
              "name": "scale",
              "docs": [
                "The number of decimal places to move to the left to yield the actual value."
              ],
              "type": "u32"
            }
          ]
        }
      },
      {
        "name": "updateSettingsParams",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "minCollateralRatio",
              "type": {
                "option": "u16"
              }
            },
            {
              "name": "feeBasisPoints",
              "type": {
                "option": "u16"
              }
            },
            {
              "name": "maxSupply",
              "type": {
                "option": "u64"
              }
            },
            {
              "name": "mintPaused",
              "type": {
                "option": "bool"
              }
            },
            {
              "name": "redeemPaused",
              "type": {
                "option": "bool"
              }
            }
          ]
        }
      }
    ]
  };
  