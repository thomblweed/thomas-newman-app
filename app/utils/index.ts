export const getFormValuesFromRequest = async (
  request: Request,
  formNames: string[]
) => {
  const data = await request.formData();
  return formNames.map((value) => data.get(value));
};
