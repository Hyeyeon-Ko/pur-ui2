export const majorFields = [
  { type: "input", field: "content", placeholder: "공통 코드를 입력하세요." },
  { type: "input", field: "name", placeholder: "코드 이름을 입력하세요." },
  {
    type: "input",
    field: "description",
    placeholder: "코드 내용을 입력하세요.",
  },
];

export const middleFields = [
  { type: "input", field: "content", placeholder: "공통 코드를 입력하세요." },
  { type: "input", field: "name", placeholder: "코드 이름을 입력하세요." },
  {
    type: "input",
    field: "description",
    placeholder: "코드 내용을 입력하세요.",
  },
];

export const smallFields = [
  { type: "input", field: "content", placeholder: "공통 코드를 입력하세요." },
  { type: "input", field: "name", placeholder: "코드 이름을 입력하세요." },
  {
    type: "input",
    field: "description",
    placeholder: "코드 내용을 입력하세요.",
  },
];


export const categoryData = [
    {
      id: "cat1",
      value: "option1",
      label: "대분류 옵션1",
      middleCategories: [
        {
          id: "middle1",
          value: "middle1",
          label: "중분류 옵션1",
          smallCategories: [
            { id: "small1-1", value: "small1-1", label: "소분류 1-1" },
            { id: "small1-2", value: "small1-2", label: "소분류 1-2" },
          ],
        },
        {
          id: "middle2",
          value: "middle2",
          label: "중분류 옵션2",
          smallCategories: [
            { id: "small2-1", value: "small2-1", label: "소분류 2-1" },
          ],
        },
        {
          id: "middle3",
          value: "middle3",
          label: "중분류 옵션3",
          smallCategories: [
            { id: "small3-1", value: "small3-1", label: "소분류 3-1" },
          ],
        },
      ],
    },
    {
      id: "cat2",
      value: "option2",
      label: "옵션 2",
      middleCategories: [
        {
          id: "middle3",
          value: "middle3",
          label: "중분류 3",
          smallCategories: [
            { id: "small3-1", value: "small3-1", label: "소분류 3-1" },
          ],
        },
      ],
    },
    {
      id: "cat3",
      value: "option3",
      label: "옵션 2",
      middleCategories: [
        {
          id: "middle4",
          value: "middle4",
          label: "중분류 4",
          smallCategories: [
            { id: "small4-1", value: "small4-1", label: "소분류 4-1" },
          ],
        },
      ],
    },
  ];