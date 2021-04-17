const board1 = [
  [ { value: 1, revealed: false }, { value: 1, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ],
  [ { value: -1 , revealed: false}, { value: 1, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ],
  [ { value: 1, revealed: false }, { value: 1, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ],
  [ { value: 0, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ]
];

const board2 = [
  [ { value: 1, revealed: false }, { value: 1, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ],
  [ { value: -1 , revealed: false}, { value: 1, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ],
  [ { value: 1, revealed: false }, { value: 1, revealed: false }, { value: 1, revealed: false }, { value: 1, revealed: false } ],
  [ { value: 0, revealed: false }, { value: 0, revealed: false }, { value: 1, revealed: false }, { value: -1, revealed: false } ]
];

const board3 = [
  [ { value: -1, revealed: false }, { value: 2, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ],
  [ { value: -1 , revealed: false}, { value: 2, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ],
  [ { value: 1, revealed: false }, { value: 1, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ],
  [ { value: 0, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ]
];

const board4 = [
  [
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": -1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": -1,
          "revealed": false
      }
  ],
  [
      {
          "value": -1,
          "revealed": false
      },
      {
          "value": 2,
          "revealed": false
      },
      {
          "value": 2,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      }
  ],
  [
      {
          "value": 2,
          "revealed": false
      },
      {
          "value": -1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": -1,
          "revealed": false
      },
      {
          "value": 2,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      }
  ],
  [
      {
          "value": 2,
          "revealed": false
      },
      {
          "value": 2,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 2,
          "revealed": false
      },
      {
          "value": -1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      }
  ],
  [
      {
          "value": -1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      }
  ],
  [
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      }
  ],
  [
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": -1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      }
  ],
  [
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 2,
          "revealed": false
      },
      {
          "value": -1,
          "revealed": false
      },
      {
          "value": 3,
          "revealed": false
      }
  ],
  [
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": 3,
          "revealed": false
      },
      {
          "value": -1,
          "revealed": false
      },
      {
          "value": -1,
          "revealed": false
      }
  ],
  [
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 0,
          "revealed": false
      },
      {
          "value": 1,
          "revealed": false
      },
      {
          "value": -1,
          "revealed": false
      },
      {
          "value": 3,
          "revealed": false
      },
      {
          "value": 2,
          "revealed": false
      }
  ]
];



export {
  board1,
  board2,
  board3,
  board4,
}
