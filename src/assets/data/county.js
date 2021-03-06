const counties = [
  {
    name: "Taipei",
    nameTW: "臺北",
  },
  { name: "NewTaipei", nameTW: "新北" },
  { name: "Taoyuan", nameTW: "桃園" },
  { name: "Taichung", nameTW: "臺中" },
  { name: "Tainan", nameTW: "臺南" },
  { name: "Kaohsiung", nameTW: "高雄" },
  { name: "Keelung", nameTW: "基隆" },
  { name: "Hsinchu", nameTW: "新竹市" },
  { name: "HsinchuCounty", nameTW: "新竹縣" },
  { name: "MiaoliCounty", nameTW: "苗栗" },
  { name: "ChanghuaCounty", nameTW: "彰化" },
  { name: "NantouCounty", nameTW: "南投" },
  { name: "YunlinCounty", nameTW: "雲林" },
  { name: "ChiayiCounty", nameTW: "嘉義縣" },
  { name: "Chiayi", nameTW: "嘉義市" },
  { name: "PingtungCounty", nameTW: "屏東" },
  { name: "YilanCounty", nameTW: "宜蘭" },
  { name: "HualienCounty", nameTW: "花蓮" },
  { name: "TaitungCounty", nameTW: "臺東" },
  { name: "KinmenCounty", nameTW: "金門" },
  { name: "PenghuCounty", nameTW: "澎湖" },
  { name: "LienchiangCounty", nameTW: "馬祖" },
];

export const getTWName = (oriName) => {
  const findedCounty = counties.find(({ name }) => name === oriName);
  return findedCounty ? findedCounty.nameTW : "";
};

export default counties;
