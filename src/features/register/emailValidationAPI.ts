import axios from "../../api/axios";

export type emailValidationInfo = {
  email: string;
  code: string;
};

export function emailValidationAPI({
  email,
  code,
}: emailValidationInfo): Promise<void> {
  return axios.get(`/validate?email=${email}&code=${code}`);
}
