import * as caseparser from 'caseparser';
import { conversions } from './conversions.js';

export default {
  async fetch() {
    return Response.json(conversions(caseparser));
  },
};
