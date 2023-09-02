import axios from 'axios'

import { IHifuminPage } from '../types/hifumin'
import { GQL_ENDPOINT } from '../config/constants'
import { getPagesById } from '../gql/hifumin'
import { axiosOptions } from '../config/axios-options'

export const fetchApi = async <const T extends IHifuminPage>(id: number): Promise<T> => {
  let resData: T | null = null

  try {
    const { data } = await axios.post(
      GQL_ENDPOINT,
      {
        query: getPagesById,
        variables: {
          id,
        },
      },
      {
        headers: axiosOptions,
      },
    )

    resData = await data.data.nhentai.by
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  return resData as T
}
