import type { NextApiRequest } from 'next'
import responseHandler, {
  CustomNextApiResponse,
} from './response/responseHandler'
const withResponseHandler = (
  handler: (req: NextApiRequest, res: CustomNextApiResponse) => void
) => {
  return (req: NextApiRequest, res: CustomNextApiResponse) => {
    responseHandler(req, res, () => {
      handler(req, res)
    })
  }
}

export default withResponseHandler
