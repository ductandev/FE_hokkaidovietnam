import JSONLocation from "./address.json";

export const useAddress = () => {
  const getDistrict = (provinceId: string | number) => {
    return JSONLocation.district.filter((district) => {
      return district.provinceId === provinceId
    })
  }

  const getWard = (districtId: string | number) => {
    return JSONLocation.ward.filter((ward) => {
      return ward.districtId === districtId
    })
  }

  const getProvince = () => {
    return JSONLocation.province
  }

  const buildAddressFromId = () => {
    return ""
  }

  return { getDistrict, getWard, getProvince, buildAddressFromId };
}