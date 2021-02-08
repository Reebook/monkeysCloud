//returns params in an order way
const getParams = obj => {
  var data = '';
  for (const item in obj) data += item + '=' + obj[item];
  return data;
};

export default getParams;
