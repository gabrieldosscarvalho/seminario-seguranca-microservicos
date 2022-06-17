export type Card = {
  id: string;
  maskedNumber: string;
  type: string;
};

export const cards = new Map<string, Card[]>([
  [
    "0001",
    [
      {
        id: "0001",
        maskedNumber: "************126",
        type: "physical",
      },
      {
        id: "0002",
        maskedNumber: "************127",
        type: "virtual",
      },
      {
        id: "0005",
        maskedNumber: "************130",
        type: "virtual",
      },
    ],
  ],
  [
    "0002",
    [
      {
        id: "0003",
        maskedNumber: "************128",
        type: "physical",
      },
    ],
  ],
  [
    "0003",
    [
      {
        id: "0004",
        maskedNumber: "************129",
        type: "physical",
      },
    ],
  ],
]);
