/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFacility = /* GraphQL */ `
  query GetFacility($id: ID!) {
    getFacility(id: $id) {
      id
      name
      address
      boxes {
        nextToken
      }
      customers {
        nextToken
      }
      orders {
        nextToken
      }
      units {
        nextToken
      }
      drivers {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFacilitys = /* GraphQL */ `
  query ListFacilitys(
    $filter: ModelFacilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFacilitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        address
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUnit = /* GraphQL */ `
  query GetUnit($id: ID!) {
    getUnit(id: $id) {
      id
      facilityID
      size
      usage
      price
      tenantID
      tenant {
        nextToken
      }
      boxes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUnits = /* GraphQL */ `
  query ListUnits(
    $filter: ModelUnitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUnits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        facilityID
        size
        usage
        price
        tenantID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAdmin = /* GraphQL */ `
  query GetAdmin($id: ID!) {
    getAdmin(id: $id) {
      id
      name
      facility {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAdmins = /* GraphQL */ `
  query ListAdmins(
    $filter: ModelAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTenant = /* GraphQL */ `
  query GetTenant($id: ID!) {
    getTenant(id: $id) {
      id
      facilityID
      name
      email
      phone
      unitID
      address {
        tenantID
        addressLine1
        addressLine2
        city
        state
        zip
        specialInstructions
        building
        parking
      }
      licenseNumber
      licenseState
      orders {
        nextToken
      }
      boxes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTenants = /* GraphQL */ `
  query ListTenants(
    $filter: ModelTenantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTenants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        facilityID
        name
        email
        phone
        unitID
        licenseNumber
        licenseState
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDriver = /* GraphQL */ `
  query GetDriver($id: ID!) {
    getDriver(id: $id) {
      id
      facilityID
      name
      createdAt
      updatedAt
    }
  }
`;
export const listDrivers = /* GraphQL */ `
  query ListDrivers(
    $filter: ModelDriverFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDrivers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        facilityID
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBox = /* GraphQL */ `
  query GetBox($id: ID!) {
    getBox(id: $id) {
      id
      tenantID
      facilityID
      unitID
      description
      status
      photo
      location
      createdAt
      updatedAt
    }
  }
`;
export const listBoxs = /* GraphQL */ `
  query ListBoxs(
    $filter: ModelBoxFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBoxs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tenantID
        facilityID
        unitID
        description
        status
        photo
        location
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      tenantID
      facilityID
      date
      time
      address
      jobType
      status
      driver
      createdAt
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tenantID
        facilityID
        date
        time
        address
        jobType
        status
        driver
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const unitsByFacility = /* GraphQL */ `
  query UnitsByFacility(
    $facilityID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelUnitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    unitsByFacility(
      facilityID: $facilityID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        facilityID
        size
        usage
        price
        tenantID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tenantByUnit = /* GraphQL */ `
  query TenantByUnit(
    $unitID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelTenantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tenantByUnit(
      unitID: $unitID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        facilityID
        name
        email
        phone
        unitID
        licenseNumber
        licenseState
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tenantByEmail = /* GraphQL */ `
  query TenantByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelTenantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tenantByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        facilityID
        name
        email
        phone
        unitID
        licenseNumber
        licenseState
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tenantsByFacility = /* GraphQL */ `
  query TenantsByFacility(
    $facilityID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelTenantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tenantsByFacility(
      facilityID: $facilityID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        facilityID
        name
        email
        phone
        unitID
        licenseNumber
        licenseState
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const driversByFacility = /* GraphQL */ `
  query DriversByFacility(
    $facilityID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelDriverFilterInput
    $limit: Int
    $nextToken: String
  ) {
    driversByFacility(
      facilityID: $facilityID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        facilityID
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const boxesByTenant = /* GraphQL */ `
  query BoxesByTenant(
    $tenantID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelBoxFilterInput
    $limit: Int
    $nextToken: String
  ) {
    boxesByTenant(
      tenantID: $tenantID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tenantID
        facilityID
        unitID
        description
        status
        photo
        location
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const boxesByFacility = /* GraphQL */ `
  query BoxesByFacility(
    $facilityID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelBoxFilterInput
    $limit: Int
    $nextToken: String
  ) {
    boxesByFacility(
      facilityID: $facilityID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tenantID
        facilityID
        unitID
        description
        status
        photo
        location
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const boxesByUnit = /* GraphQL */ `
  query BoxesByUnit(
    $unitID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelBoxFilterInput
    $limit: Int
    $nextToken: String
  ) {
    boxesByUnit(
      unitID: $unitID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tenantID
        facilityID
        unitID
        description
        status
        photo
        location
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const ordersByTenant = /* GraphQL */ `
  query OrdersByTenant(
    $tenantID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByTenant(
      tenantID: $tenantID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tenantID
        facilityID
        date
        time
        address
        jobType
        status
        driver
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const ordersbyFacility = /* GraphQL */ `
  query OrdersbyFacility(
    $facilityID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersbyFacility(
      facilityID: $facilityID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tenantID
        facilityID
        date
        time
        address
        jobType
        status
        driver
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
