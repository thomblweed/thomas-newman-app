import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { axiosService, createAxiosInstance } from '~/service/axios.service';
import type { Environment } from '~/config';
import { config } from '~/config';

const env = (process.env.NODE_ENV as Environment) ?? 'development';
const demoConfig = config[env].api.demo;

const axiosInstance = createAxiosInstance(demoConfig!.baseUrl);

type Person = {
  PersonID: string;
  LastName: string;
  FirstName: string;
  Address: string;
  City: string;
};

export const loader: LoaderFunction = async () => {
  const response = await axiosService(axiosInstance, demoConfig!.demo, {
    method: 'GET',
    params: { city: 'New York' }
  });

  return response.data;
};

export default () => {
  const values = useLoaderData();
  return (
    <div>
      {values?.map((value: Person) => (
        <>
          <div
            key={value.PersonID}
          >{`${value.FirstName} ${value.LastName}`}</div>
          <div>{value.Address}</div>
          <div>{value.City}</div>
          <br />
        </>
      ))}
    </div>
  );
};
