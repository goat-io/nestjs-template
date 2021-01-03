import { OrganizationDtoIn, OrganizationDtoOut } from './organizations.dto'

import { FirebaseConnector } from '@goatlab/fluent/dist/Providers/Firebase/FirebaseConnector'
import { Organization } from './organizations.entity'

export class OrganizationsService extends FirebaseConnector<
  Organization,
  OrganizationDtoIn,
  OrganizationDtoOut
> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(relations?: any) {
    super(Organization, relations)
  }
}
