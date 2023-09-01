import axios from 'axios'
import { IHen } from '../types/nhen'
import { GQL_ENDPOINT } from '../config/constants'
import { getPagesById } from '../gql/nh'
import { options } from '../config/axios-options'

export const fetchApi = async <const T extends IHen>(id: number): Promise<T> => {
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
        headers: options,
      }
    )

    resData = await data.data.nhentai.by
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  return resData as T
}
