import { CategoryData } from "@/types/categoryTypes";

export const fileOptions = [
  {
    value: "file1",
    label: "File 1",
    url: "/files/file1.pdf",
    description: "Description for File 1",
  },
  {
    value: "file2",
    label: "File 2",
    url: "/files/file2.pdf",
    description: "Description for File 2",
  },
  {
    value: "file3",
    label: "File 3",
    url: "/files/file3.pdf",
    description: "Description for File 3",
  },
];

export const reasonOptions = [
  { value: "audit", label: "감사대비용" },
  { value: "work", label: "업무확인용" },
  { value: "etc", label: "기타" },
];

export const majorCategoryOptions = [
  { value: "", label: "대분류 선택" },
  { value: "option1", label: "옵션 1" },
  { value: "option2", label: "옵션 2" },
  { value: "option3", label: "옵션 3" },
];

export const middleCategoryOptions = [
  { value: "", label: "중분류 선택" },
  { value: "option1", label: "옵션 1" },
  { value: "option2", label: "옵션 2" },
  { value: "option3", label: "옵션 3" },
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

export const contractAddOptions = [
  { value: "sole", label: "수의계약" },
  { value: "contract", label: "입찰번호 조회" },
];

export const tenderAddOptions = [
  { value: "announce", label: "본공고" },
  { value: "re-announce", label: "재공고" },
];
