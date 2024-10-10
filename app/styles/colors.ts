const colors = {
    'primary': '#051d36',
    'secondary': '#555555',
    'accent': '#9c27b0',
    'positive': '#0075ff',
    'negative': '#e30000',
    'info': '#00cd52',
    'warning': '#f2c037',
    'Red_Darken-5': '#220000',
    'Red_Darken-4': '#440000',
    'Red_Darken-3': '#5E0000',
    'Red_Darken-2': '#820000',
    'Red_Darken-1': '#AD0000',
    'Red_Default': '#E30000',
    'Red_Lighten-1': '#FB4444',
    'Red_Lighten-2': '#FF7C7C',
    'Red_Lighten-3': '#FFB5B5',
    'Red_Lighten-4': '#FFD3D3',
    'Red_Lighten-5': '#FCE6E6',
    'Red_Lighten-6': '#FCEFEF',
    'Caution_Icon': '#fd9595',
    'Orange_Darken-5': '#2F1100',
    'Orange_Darken-4': '#4D1B00',
    'Orange_Darken-3': '#752A00',
    'Orange_Darken-2': '#9B3700',
    'Orange_Darken-1': '#CE4900',
    'Orange_Default': '#FF6B00',
    'Orange_Lighten-1': '#FF7F22',
    'Orange_Lighten-2': '#FFA452',
    'Orange_Lighten-3': '#FFBC81',
    'Orange_Lighten-4': '#FFD5AF',
    'Orange_Lighten-5': '#FFEAD7',
    'Orange_Lighten-6': '#FEF1EA',
    'Header_Alert': '#FF7A00',
    'Yellow_Darken-5': '#553D00',
    'Yellow_Darken-4': '#7D5A00',
    'Yellow_Darken-3': '#A87900',
    'Yellow_Darken-2': '#CD9400',
    'Yellow_Darken-1': '#F3BE00',
    'Yellow_Default': '#FFC700',
    'Yellow_Lighten-1': '#FFD359',
    'Yellow_Lighten-2': '#FFDF87',
    'Yellow_Lighten-3': '#FFECB9',
    'Yellow_Lighten-4': '#FFF3D0',
    'Yellow_Lighten-5': '#FFF6DE',
    'Yellow_Lighten-6': '#FFFBF2',
    'Greenish-yellow_Darken-5': '#2C2C00',
    'Greenish-yellow_Darken-4': '#454500',
    'Greenish-yellow_Darken-3': '#636300',
    'Greenish-yellow_Darken-2': '#838300',
    'Greenish-Yellow_Darken-1': '#A5A500',
    'Greenish-Yellow_Default': '#C7C700',
    'Greenish-Yellow_Lighten-1': '#E0E01F',
    'Greenish-Yellow_Lighten-2': '#F3F354',
    'Greenish-Yellow_Lighten-3': '#FFFF80',
    'Greenish-Yellow_Lighten-4': '#FAFAB2',
    'Greenish-Yellow_Lighten-5': '#FAFAD8',
    'Greenish-Yellow_Lighten-6': '#F9F9E4',
    'Green_Darken-5': '#001D0B',
    'Green_Darken-4': '#003013',
    'Green_Darken-3': '#00461C',
    'Green_Darken-2': '#006629',
    'Green_Darken-1': '#007B31',
    'Green_Default': '#00973C',
    'Green_Lighten-1': '#01BB4B',
    'Green_Lighten-2': '#05D358',
    'Green_Lighten-3': '#3EE882',
    'Green_Lighten-4': '#87EDB0',
    'Green_Lighten-5': '#C4F9D9',
    'Green_Lighten-6': '#E8F9EF',
    'Blue_A_Darken-5': '#021a25',
    'Blue_A_Darken-4': '#02212f',
    'Blue_A_Darken-3': '#032d40',
    'Blue_A_Darken-2': '#033f59',
    'Blue_A_Darken-1': '#06587d',
    'Blue_A_Default': '#066d9b',
    'Blue_A_Lighten-1': '#128fc7',
    'Blue_A_Lighten-2': '#229fd7',
    'Blue_A_Lighten-3': '#50bff0',
    'Blue_A_Lighten-4': '#a4e2fd',
    'Blue_A_Lighten-5': '#d9f2fd',
    'Blue_A_Lighten-6': '#ecf8fd',
    'Blue_B_Darken-5': '#011428',
    'Blue_B_Darken-4': '#03172d',
    'Blue_B_Darken-3': '#051d36',
    'Blue_B_Darken-2': '#07284a',
    'Blue_B_Darken-1': '#004177',
    'Blue_B_Default': '#025497',
    'Blue_B_Lighten-1': '#006ac1',
    'Blue_B_Lighten-2': '#1f8ae1',
    'Blue_B_Lighten-3': '#5cb0f3',
    'Blue_B_Lighten-4': '#9cd1fc',
    'Blue_B_Lighten-5': '#d5ebfe',
    'Blue_B_Lighten-6': '#eaf5fe',
    'Blue_C_Darken-5': '#001226',
    'Blue_C_Darken-4': '#001b39',
    'Blue_C_Darken-3': '#002b5e',
    'Blue_C_Darken-2': '#004290',
    'Blue_C_Darken-1': '#005cc9',
    'Blue_C_Default': '#0075ff',
    'Blue_C_Lighten-1': '#2d8dff',
    'Blue_C_Lighten-2': '#64abff',
    'Blue_C_Lighten-3': '#93c4ff',
    'Blue_C_Lighten-4': '#bbdaff',
    'Blue_C_Lighten-5': '#d9eaff',
    'Blue_C_Lighten-6': '#e6f1ff',
    'Blue_C_Lighten-7': '#eff6ff',
    'Blue_C_Lighten-8': '#f5faff',
    'Grey_Darken-5': '#222222',
    'Grey_Darken-4': '#333333',
    'Grey_Darken-3': '#444444',
    'Grey_Darken-2': '#555555',
    'Grey_Darken-1': '#737373',
    'Grey_Default': '#888888',
    'Grey_Lighten-1': '#aaaaaa',
    'Grey_Lighten-2': '#cccccc',
    'Grey_Lighten-3': '#e1e1e1',
    'Grey_Lighten-4': '#eeeeee',
    'Grey_Lighten-5': '#f6f6f6',
    'Grey_Lighten-6': '#f9f9f9',
    'Grey_Lighten-7': '#E5E5E5',
    'Grey_Lighten-8': '#D8D8D8',
    'white': '#ffffff',
    'black': '#000000',
    'currentColor': 'currentColor',
   };
   export default colors