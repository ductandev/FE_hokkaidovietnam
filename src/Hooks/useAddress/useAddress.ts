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

  const buildAddressFromId = (payload: any) => {
    const phuong: any = getWard(payload.quan_id).find(y => y.id === payload.phuong_id)?.name || "chưa xác định";
    const quan: any = getDistrict(payload.tinh_thanh_id).find(y => y.id === payload.tinh_thanh_id)?.name || "chưa xác định";
    const thanhPho: any = getProvince().find(y => y.id === payload.tinh_thanh_id)?.name || "chưa xác định";

    return payload.dia_chi + ", " + phuong + ", " + quan + ", " + thanhPho
  }

  return { getDistrict, getWard, getProvince, buildAddressFromId };
}