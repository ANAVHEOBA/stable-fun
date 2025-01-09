export const IDL = {
    "version": "0.1.0",
    "name": "stable_fun_new",
    "instructions": [
      {
        "name": "initialize",
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
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
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "NameTooShort",
        "msg": "Name must be at least 3 characters"
      },
      {
        "code": 6001,
        "name": "SymbolTooShort",
        "msg": "Symbol must be at least 2 characters"
      }
    ]
  };