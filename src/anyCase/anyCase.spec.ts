import { describe, expect, expectTypeOf, test } from 'vitest';
import * as caseparser from '../index.ts';
import { words } from './words.ts';

describe('words', () => {
  test.each([
    ['helloWorld', ['hello', 'world']],
    ['HelloWorld', ['hello', 'world']],
    ['hello_world', ['hello', 'world']],
    ['hello-world', ['hello', 'world']],
    ['HELLO_WORLD', ['hello', 'world']],
    ['HELLO-WORLD', ['hello', 'world']],
    ['Hello-World', ['hello', 'world']],
    ['hello.world', ['hello', 'world']],
    ['Hello World', ['hello', 'world']],
    ['Hello world', ['hello', 'world']],
    ['userID', ['user', 'id']],
    ['ID', ['id']],
    ['XMLHttpRequest', ['xml', 'http', 'request']],
    ['getHTTPResponseCode', ['get', 'http', 'response', 'code']],
    ['X-API-Key', ['x', 'api', 'key']],
    ['html5Parser', ['html5', 'parser']],
    ['v2Api', ['v2', 'api']],
    ['first_name-mixed.caseKey', ['first', 'name', 'mixed', 'case', 'key']],
    ['__leading--double..sep  ', ['leading', 'double', 'sep']],
    ['', []],
  ])('Should split %j into words', (input, expected) => {
    expect(words(input)).toEqual(expected);
  });
});

describe('words keeping the original case', () => {
  test.each([
    ['XMLHttpRequest', false, ['XML', 'Http', 'Request']],
    ['Hello World', false, ['Hello', 'World']],
    ['HELLO_WORLD', false, ['HELLO', 'WORLD']],
    ['userID', false, ['user', 'ID']],
    ['$catDog', true, ['$cat', 'Dog']],
  ] as const)('Should split %j keeping the case (allowSymbols %j)', (input, keep, expected) => {
    expect(words(input, keep, false)).toEqual(expected);
  });
  test('Should keep the original case in toSpace, toPath and toDot only', () => {
    expect(caseparser.toSpace('XMLHttpRequest')).toBe('XML Http Request');
    expect(caseparser.toPath('UserProfile')).toBe('User/Profile');
    expect(caseparser.toDot('UserProfile')).toBe('User.Profile');
    expect(caseparser.toPath('helloWorld').toLowerCase()).toBe('hello/world');
    expect(caseparser.toSnake('UserProfile')).toBe('user_profile');
    expect(caseparser.toLower('XMLHttpRequest')).toBe('xml http request');
    expect(caseparser.toSpace('$catDog', true)).toBe('$cat Dog');
  });
});

describe('toX (from any case)', () => {
  const input = {
    string: 'grand_rapids-charter.townshipID',
    json: {
      "id": 1,
      "is_under_age": false,
      "firstName": "John",
      "Last-Name": "Doe",
      "EMAIL_ADDRESS": "john.doe@example.com",
      "telephone.numbers": [
        "(616) 361-1338",
      ],
      "Home Addresses": [
        {
          "postal_code": "61105",
          "Street": {
            "streetName": "41 Forest Run Circle",
            "STREET-NUMBER": "539"
          }
        }
      ]
    }
  };
  test('Should convert a string from any case', () => {
    expect(caseparser.toCamel(input.string)).toMatchInlineSnapshot('"grandRapidsCharterTownshipId"');
    expect(caseparser.toPascal(input.string)).toMatchInlineSnapshot('"GrandRapidsCharterTownshipId"');
    expect(caseparser.toSnake(input.string)).toMatchInlineSnapshot('"grand_rapids_charter_township_id"');
    expect(caseparser.toKebab(input.string)).toMatchInlineSnapshot('"grand-rapids-charter-township-id"');
    expect(caseparser.toUpperSnake(input.string)).toMatchInlineSnapshot('"GRAND_RAPIDS_CHARTER_TOWNSHIP_ID"');
    expect(caseparser.toUpperKebab(input.string)).toMatchInlineSnapshot('"GRAND-RAPIDS-CHARTER-TOWNSHIP-ID"');
    expect(caseparser.toTrain(input.string)).toMatchInlineSnapshot('"Grand-Rapids-Charter-Township-Id"');
    expect(caseparser.toDot(input.string)).toMatchInlineSnapshot('"grand.rapids.charter.township.ID"');
    expect(caseparser.toTitle(input.string)).toMatchInlineSnapshot('"Grand Rapids Charter Township Id"');
    expect(caseparser.toSentence(input.string)).toMatchInlineSnapshot('"Grand rapids charter township id"');
    expect(caseparser.toPascalSnake(input.string)).toBe('Grand_Rapids_Charter_Township_Id');
    expect(caseparser.toPath(input.string)).toBe('grand/rapids/charter/township/ID');
    expect(caseparser.toSpace(input.string)).toBe('grand rapids charter township ID');
    expect(caseparser.toLower(input.string)).toBe('grand rapids charter township id');
    expect(caseparser.toUpper(input.string)).toBe('GRAND RAPIDS CHARTER TOWNSHIP ID');
  });
  test('Should convert a json from any case to camelCase', () => {
    expect(caseparser.toCamel(input.json)).toMatchInlineSnapshot(`
      {
        "emailAddress": "john.doe@example.com",
        "firstName": "John",
        "homeAddresses": [
          {
            "postalCode": "61105",
            "street": {
              "streetName": "41 Forest Run Circle",
              "streetNumber": "539",
            },
          },
        ],
        "id": 1,
        "isUnderAge": false,
        "lastName": "Doe",
        "telephoneNumbers": [
          "(616) 361-1338",
        ],
      }
    `);
  });
  test('Should convert a json from any case to snake_case', () => {
    expect(caseparser.toSnake(input.json)).toMatchInlineSnapshot(`
      {
        "email_address": "john.doe@example.com",
        "first_name": "John",
        "home_addresses": [
          {
            "postal_code": "61105",
            "street": {
              "street_name": "41 Forest Run Circle",
              "street_number": "539",
            },
          },
        ],
        "id": 1,
        "is_under_age": false,
        "last_name": "Doe",
        "telephone_numbers": [
          "(616) 361-1338",
        ],
      }
    `);
  });
  test('Should convert a json from any case to Title Case', () => {
    expect(caseparser.toTitle(input.json)).toMatchInlineSnapshot(`
      {
        "Email Address": "john.doe@example.com",
        "First Name": "John",
        "Home Addresses": [
          {
            "Postal Code": "61105",
            "Street": {
              "Street Name": "41 Forest Run Circle",
              "Street Number": "539",
            },
          },
        ],
        "Id": 1,
        "Is Under Age": false,
        "Last Name": "Doe",
        "Telephone Numbers": [
          "(616) 361-1338",
        ],
      }
    `);
  });
  test('Should keep values, non-plain objects and primitives inside arrays untouched', () => {
    const date = new Date(0);
    const result = caseparser.toSnake({ createdAt: date, tags: ['someTag', { tagName: 'x' }] });
    expect(result.created_at).toBe(date);
    expect(result.tags).toEqual(['someTag', { tag_name: 'x' }]);
  });
  test('Should return undefined for inputs that are not strings, arrays or plain objects', () => {
    expect(caseparser.toCamel(42 as never)).toBeUndefined();
    expect(caseparser.toCamel(null as never)).toBeUndefined();
    expect(caseparser.toCamel(undefined as never)).toBeUndefined();
  });
});

describe('toX symbols', () => {
  test.each([
    ['$Hello-world', false, ['hello', 'world']],
    ['$Hello-world', true, ['$hello', 'world']],
    ['$catDog', false, ['cat', 'dog']],
    ['$catDog', true, ['$cat', 'dog']],
    ['@type', ['$'], ['type']],
    ['$ref', ['$'], ['$ref']],
    ['first$Name-@last', ['@'], ['first', 'name', '@last']],
    ['price%Rate', true, ['price', '%rate']],
    ['$$hello$World$$hi', false, ['hello', 'world', 'hi']],
    ['$$hello$World$$hi', true, ['$$hello', '$world', '$$hi']],
    ['user@name', false, ['user', 'name']],
    ['user@name', true, ['user', '@name']],
    ['total%', true, ['total%']],
    ['total%_count', true, ['total%', 'count']],
    ['a$$', true, ['a$$']],
    ['$_id', true, ['$', 'id']],
    ['_links', true, ['links']],
    ['名前_key', false, ['名前', 'key']],
    ['$', false, []],
  ] as const)('Should split %j with allowSymbols %j', (input, keep, expected) => {
    expect(words(input, keep)).toEqual(expected);
  });
  test('Should remove symbols by default, keep all with true, or keep only the listed ones', () => {
    const data = { $ref: 1, '@type': 'x', user_id: 2 };
    expect(caseparser.toCamel(data)).toEqual({ ref: 1, type: 'x', userId: 2 });
    expect(caseparser.toCamel(data, true)).toEqual({ $ref: 1, '@type': 'x', userId: 2 });
    expect(caseparser.toCamel(data, ['$'])).toEqual({ $ref: 1, type: 'x', userId: 2 });
    expect(caseparser.toCamel(data, false)).toEqual(caseparser.toCamel(data));
  });
  test('Should capitalize the first letter after kept symbols', () => {
    expect(caseparser.toCamel('$Hello-world', true)).toBe('$helloWorld');
    expect(caseparser.toPascal('$id', true)).toBe('$Id');
    expect(caseparser.toTitle('@first_name', true)).toBe('@First Name');
    expect(caseparser.toSentence('$first_name', true)).toBe('$First name');
    expect(caseparser.toUpperSnake('$first_name', ['$'])).toBe('$FIRST_NAME');
    expect(caseparser.toPascal('$$hello$World$$hi')).toBe('HelloWorldHi');
    expect(caseparser.toPascal('$$hello$World$$hi', true)).toBe('$$Hello$World$$Hi');
    expect(caseparser.toSnake('$$hello$World$$hi', true)).toBe('$$hello_$world_$$hi');
  });
});

describe('toX options', () => {
  const data = { $ref: 1, '@type': 'x', user_id: 2 };
  test('Should accept allowSymbols as a shorthand or inside the options object', () => {
    expect(caseparser.toCamel(data, { allowSymbols: true })).toEqual(caseparser.toCamel(data, true));
    expect(caseparser.toCamel(data, { allowSymbols: ['$'] })).toEqual(caseparser.toCamel(data, ['$']));
    expect(caseparser.toCamel(data, { allowSymbols: false })).toEqual(caseparser.toCamel(data));
    expect(caseparser.toCamel(data, {})).toEqual(caseparser.toCamel(data));
    expect(caseparser.toSnake('$first_name', { allowSymbols: ['$'] })).toBe('$first_name');
  });
  test('Should keep the original case in toDot and toPath unless transform is passed', () => {
    expect(caseparser.toDot('XMLHttpRequest', {})).toBe('XML.Http.Request');
    expect(caseparser.toDot('XMLHttpRequest', { transform: 'lowercase' })).toBe('xml.http.request');
    expect(caseparser.toDot('XMLHttpRequest', { transform: 'uppercase' })).toBe('XML.HTTP.REQUEST');
    expect(caseparser.toPath('UserProfile', { transform: 'lowercase' })).toBe('user/profile');
    expect(caseparser.toPath('UserProfile', { transform: 'uppercase' })).toBe('USER/PROFILE');
    expect(caseparser.toPath('$UserProfile', { allowSymbols: true, transform: 'lowercase' })).toBe('$user/profile');
  });
  test('Should split words on / and \\ in toPath only', () => {
    expect(caseparser.toPath('profile/picture', true)).toBe('profile/picture');
    expect(caseparser.toPath('users\\adaLovelace')).toBe('users/ada/Lovelace');
    expect(caseparser.toPath('/api//v2\\users/', true)).toBe('api/v2/users');
    expect(caseparser.toSnake('profile/picture', true)).toBe('profile_/picture');
    expect(caseparser.toDot('profile/picture', true)).toBe('profile./picture');
    expect(caseparser.toSnake('users\\ada', true)).toBe('users_\\ada');
  });
  test('Should join toPath with the separator option', () => {
    expect(caseparser.toPath('users/profilePicture', { separator: '\\' })).toBe('users\\profile\\Picture');
    expect(caseparser.toPath('users\\profilePicture', { separator: '/' })).toBe('users/profile/Picture');
    expect(caseparser.toPath('Users/ProfilePicture', { separator: '\\', transform: 'lowercase' })).toBe('users\\profile\\picture');
    expect(caseparser.toPath('$user/id', { separator: '\\', allowSymbols: ['$'] })).toBe('$user\\id');
    expect(caseparser.toPath({ 'billing/address': { 'Postal Code': 1 } }, { separator: '\\' })).toEqual({ 'billing\\address': { 'Postal\\Code': 1 } });
    expect(caseparser.toPath('a_b', { separator: '|' as never })).toBe('a/b');
  });
  test('Should transform the keys of an object deeply', () => {
    const response = { user_Id: 42, LAST_name: 'Lovelace', 'billing address': { 'Postal Code': '61105' } };
    expect(caseparser.toDot(response, { transform: 'lowercase' })).toEqual({
      'user.id': 42,
      'last.name': 'Lovelace',
      'billing.address': { 'postal.code': '61105' },
    });
    expect(caseparser.toPath(response, { transform: 'uppercase' })).toEqual({
      'USER/ID': 42,
      'LAST/NAME': 'Lovelace',
      'BILLING/ADDRESS': { 'POSTAL/CODE': '61105' },
    });
  });
});

describe('toX with keys in every case', () => {
  const response = {
    userId: 42,
    FirstName: 'Ada',
    last_name: 'Lovelace',
    'birth-date': '1815-12-10',
    ACCOUNT_STATUS: 'active',
    'API-VERSION': 'v2',
    'Content-Type': 'application/json',
    'created.at': '2026-09-24',
    'Display Name': 'Countess',
    'Preferred language': 'en',
    Is_Verified: true,
    'profile/picture': null,
    'nick name': 'Ada',
    'MIDDLE NAME': 'King',
    XMLHttpRequest: false,
    html5Parser: 'enabled',
    $ref: '#/users/42',
    '@type': 'User',
    'discount%': 10,
    __private_flag: false,
    LAST_login_AT: '2026-09-01',
    'billing address': {
      'Postal Code': '61105',
      'street/name': 'Forest Run Circle',
      countryISO: 'US'
    },
    'recent.orders': [
      { order_id: 1, TotalAmount: 99.9, 'shipping-method': 'express' },
      { order_id: 2, TotalAmount: 45.5, 'shipping-method': 'standard' }
    ],
    tags: ['someTag', 'another_tag']
  };
  test('Should convert every key, deeply, keeping the values', () => {
    expect(caseparser.toCamel(response)).toEqual({"userId": 42, "firstName": "Ada", "lastName": "Lovelace", "birthDate": "1815-12-10", "accountStatus": "active", "apiVersion": "v2", "contentType": "application/json", "createdAt": "2026-09-24", "displayName": "Countess", "preferredLanguage": "en", "isVerified": true, "profilePicture": null, "nickName": "Ada", "middleName": "King", "xmlHttpRequest": false, "html5Parser": "enabled", "ref": "#/users/42", "type": "User", "discount": 10, "privateFlag": false, "lastLoginAt": "2026-09-01", "billingAddress": {"postalCode": "61105", "streetName": "Forest Run Circle", "countryIso": "US"}, "recentOrders": [{"orderId": 1, "totalAmount": 99.9, "shippingMethod": "express"}, {"orderId": 2, "totalAmount": 45.5, "shippingMethod": "standard"}], "tags": ["someTag", "another_tag"]});
    expect(caseparser.toPascal(response)).toEqual({"UserId": 42, "FirstName": "Ada", "LastName": "Lovelace", "BirthDate": "1815-12-10", "AccountStatus": "active", "ApiVersion": "v2", "ContentType": "application/json", "CreatedAt": "2026-09-24", "DisplayName": "Countess", "PreferredLanguage": "en", "IsVerified": true, "ProfilePicture": null, "NickName": "Ada", "MiddleName": "King", "XmlHttpRequest": false, "Html5Parser": "enabled", "Ref": "#/users/42", "Type": "User", "Discount": 10, "PrivateFlag": false, "LastLoginAt": "2026-09-01", "BillingAddress": {"PostalCode": "61105", "StreetName": "Forest Run Circle", "CountryIso": "US"}, "RecentOrders": [{"OrderId": 1, "TotalAmount": 99.9, "ShippingMethod": "express"}, {"OrderId": 2, "TotalAmount": 45.5, "ShippingMethod": "standard"}], "Tags": ["someTag", "another_tag"]});
    expect(caseparser.toSnake(response)).toEqual({"user_id": 42, "first_name": "Ada", "last_name": "Lovelace", "birth_date": "1815-12-10", "account_status": "active", "api_version": "v2", "content_type": "application/json", "created_at": "2026-09-24", "display_name": "Countess", "preferred_language": "en", "is_verified": true, "profile_picture": null, "nick_name": "Ada", "middle_name": "King", "xml_http_request": false, "html5_parser": "enabled", "ref": "#/users/42", "type": "User", "discount": 10, "private_flag": false, "last_login_at": "2026-09-01", "billing_address": {"postal_code": "61105", "street_name": "Forest Run Circle", "country_iso": "US"}, "recent_orders": [{"order_id": 1, "total_amount": 99.9, "shipping_method": "express"}, {"order_id": 2, "total_amount": 45.5, "shipping_method": "standard"}], "tags": ["someTag", "another_tag"]});
    expect(caseparser.toKebab(response)).toEqual({"user-id": 42, "first-name": "Ada", "last-name": "Lovelace", "birth-date": "1815-12-10", "account-status": "active", "api-version": "v2", "content-type": "application/json", "created-at": "2026-09-24", "display-name": "Countess", "preferred-language": "en", "is-verified": true, "profile-picture": null, "nick-name": "Ada", "middle-name": "King", "xml-http-request": false, "html5-parser": "enabled", "ref": "#/users/42", "type": "User", "discount": 10, "private-flag": false, "last-login-at": "2026-09-01", "billing-address": {"postal-code": "61105", "street-name": "Forest Run Circle", "country-iso": "US"}, "recent-orders": [{"order-id": 1, "total-amount": 99.9, "shipping-method": "express"}, {"order-id": 2, "total-amount": 45.5, "shipping-method": "standard"}], "tags": ["someTag", "another_tag"]});
    expect(caseparser.toUpperSnake(response)).toEqual({"USER_ID": 42, "FIRST_NAME": "Ada", "LAST_NAME": "Lovelace", "BIRTH_DATE": "1815-12-10", "ACCOUNT_STATUS": "active", "API_VERSION": "v2", "CONTENT_TYPE": "application/json", "CREATED_AT": "2026-09-24", "DISPLAY_NAME": "Countess", "PREFERRED_LANGUAGE": "en", "IS_VERIFIED": true, "PROFILE_PICTURE": null, "NICK_NAME": "Ada", "MIDDLE_NAME": "King", "XML_HTTP_REQUEST": false, "HTML5_PARSER": "enabled", "REF": "#/users/42", "TYPE": "User", "DISCOUNT": 10, "PRIVATE_FLAG": false, "LAST_LOGIN_AT": "2026-09-01", "BILLING_ADDRESS": {"POSTAL_CODE": "61105", "STREET_NAME": "Forest Run Circle", "COUNTRY_ISO": "US"}, "RECENT_ORDERS": [{"ORDER_ID": 1, "TOTAL_AMOUNT": 99.9, "SHIPPING_METHOD": "express"}, {"ORDER_ID": 2, "TOTAL_AMOUNT": 45.5, "SHIPPING_METHOD": "standard"}], "TAGS": ["someTag", "another_tag"]});
    expect(caseparser.toUpperKebab(response)).toEqual({"USER-ID": 42, "FIRST-NAME": "Ada", "LAST-NAME": "Lovelace", "BIRTH-DATE": "1815-12-10", "ACCOUNT-STATUS": "active", "API-VERSION": "v2", "CONTENT-TYPE": "application/json", "CREATED-AT": "2026-09-24", "DISPLAY-NAME": "Countess", "PREFERRED-LANGUAGE": "en", "IS-VERIFIED": true, "PROFILE-PICTURE": null, "NICK-NAME": "Ada", "MIDDLE-NAME": "King", "XML-HTTP-REQUEST": false, "HTML5-PARSER": "enabled", "REF": "#/users/42", "TYPE": "User", "DISCOUNT": 10, "PRIVATE-FLAG": false, "LAST-LOGIN-AT": "2026-09-01", "BILLING-ADDRESS": {"POSTAL-CODE": "61105", "STREET-NAME": "Forest Run Circle", "COUNTRY-ISO": "US"}, "RECENT-ORDERS": [{"ORDER-ID": 1, "TOTAL-AMOUNT": 99.9, "SHIPPING-METHOD": "express"}, {"ORDER-ID": 2, "TOTAL-AMOUNT": 45.5, "SHIPPING-METHOD": "standard"}], "TAGS": ["someTag", "another_tag"]});
    expect(caseparser.toTrain(response)).toEqual({"User-Id": 42, "First-Name": "Ada", "Last-Name": "Lovelace", "Birth-Date": "1815-12-10", "Account-Status": "active", "Api-Version": "v2", "Content-Type": "application/json", "Created-At": "2026-09-24", "Display-Name": "Countess", "Preferred-Language": "en", "Is-Verified": true, "Profile-Picture": null, "Nick-Name": "Ada", "Middle-Name": "King", "Xml-Http-Request": false, "Html5-Parser": "enabled", "Ref": "#/users/42", "Type": "User", "Discount": 10, "Private-Flag": false, "Last-Login-At": "2026-09-01", "Billing-Address": {"Postal-Code": "61105", "Street-Name": "Forest Run Circle", "Country-Iso": "US"}, "Recent-Orders": [{"Order-Id": 1, "Total-Amount": 99.9, "Shipping-Method": "express"}, {"Order-Id": 2, "Total-Amount": 45.5, "Shipping-Method": "standard"}], "Tags": ["someTag", "another_tag"]});
    expect(caseparser.toTitle(response)).toEqual({"User Id": 42, "First Name": "Ada", "Last Name": "Lovelace", "Birth Date": "1815-12-10", "Account Status": "active", "Api Version": "v2", "Content Type": "application/json", "Created At": "2026-09-24", "Display Name": "Countess", "Preferred Language": "en", "Is Verified": true, "Profile Picture": null, "Nick Name": "Ada", "Middle Name": "King", "Xml Http Request": false, "Html5 Parser": "enabled", "Ref": "#/users/42", "Type": "User", "Discount": 10, "Private Flag": false, "Last Login At": "2026-09-01", "Billing Address": {"Postal Code": "61105", "Street Name": "Forest Run Circle", "Country Iso": "US"}, "Recent Orders": [{"Order Id": 1, "Total Amount": 99.9, "Shipping Method": "express"}, {"Order Id": 2, "Total Amount": 45.5, "Shipping Method": "standard"}], "Tags": ["someTag", "another_tag"]});
    expect(caseparser.toSentence(response)).toEqual({"User id": 42, "First name": "Ada", "Last name": "Lovelace", "Birth date": "1815-12-10", "Account status": "active", "Api version": "v2", "Content type": "application/json", "Created at": "2026-09-24", "Display name": "Countess", "Preferred language": "en", "Is verified": true, "Profile picture": null, "Nick name": "Ada", "Middle name": "King", "Xml http request": false, "Html5 parser": "enabled", "Ref": "#/users/42", "Type": "User", "Discount": 10, "Private flag": false, "Last login at": "2026-09-01", "Billing address": {"Postal code": "61105", "Street name": "Forest Run Circle", "Country iso": "US"}, "Recent orders": [{"Order id": 1, "Total amount": 99.9, "Shipping method": "express"}, {"Order id": 2, "Total amount": 45.5, "Shipping method": "standard"}], "Tags": ["someTag", "another_tag"]});
    expect(caseparser.toPascalSnake(response)).toEqual({"User_Id": 42, "First_Name": "Ada", "Last_Name": "Lovelace", "Birth_Date": "1815-12-10", "Account_Status": "active", "Api_Version": "v2", "Content_Type": "application/json", "Created_At": "2026-09-24", "Display_Name": "Countess", "Preferred_Language": "en", "Is_Verified": true, "Profile_Picture": null, "Nick_Name": "Ada", "Middle_Name": "King", "Xml_Http_Request": false, "Html5_Parser": "enabled", "Ref": "#/users/42", "Type": "User", "Discount": 10, "Private_Flag": false, "Last_Login_At": "2026-09-01", "Billing_Address": {"Postal_Code": "61105", "Street_Name": "Forest Run Circle", "Country_Iso": "US"}, "Recent_Orders": [{"Order_Id": 1, "Total_Amount": 99.9, "Shipping_Method": "express"}, {"Order_Id": 2, "Total_Amount": 45.5, "Shipping_Method": "standard"}], "Tags": ["someTag", "another_tag"]});
    expect(caseparser.toPath(response)).toEqual({"user/Id": 42, "First/Name": "Ada", "last/name": "Lovelace", "birth/date": "1815-12-10", "ACCOUNT/STATUS": "active", "API/VERSION": "v2", "Content/Type": "application/json", "created/at": "2026-09-24", "Display/Name": "Countess", "Preferred/language": "en", "Is/Verified": true, "profile/picture": null, "nick/name": "Ada", "MIDDLE/NAME": "King", "XML/Http/Request": false, "html5/Parser": "enabled", "ref": "#/users/42", "type": "User", "discount": 10, "private/flag": false, "LAST/login/AT": "2026-09-01", "billing/address": {"Postal/Code": "61105", "street/name": "Forest Run Circle", "country/ISO": "US"}, "recent/orders": [{"order/id": 1, "Total/Amount": 99.9, "shipping/method": "express"}, {"order/id": 2, "Total/Amount": 45.5, "shipping/method": "standard"}], "tags": ["someTag", "another_tag"]});
    expect(caseparser.toDot(response)).toEqual({"user.Id": 42, "First.Name": "Ada", "last.name": "Lovelace", "birth.date": "1815-12-10", "ACCOUNT.STATUS": "active", "API.VERSION": "v2", "Content.Type": "application/json", "created.at": "2026-09-24", "Display.Name": "Countess", "Preferred.language": "en", "Is.Verified": true, "profile.picture": null, "nick.name": "Ada", "MIDDLE.NAME": "King", "XML.Http.Request": false, "html5.Parser": "enabled", "ref": "#/users/42", "type": "User", "discount": 10, "private.flag": false, "LAST.login.AT": "2026-09-01", "billing.address": {"Postal.Code": "61105", "street.name": "Forest Run Circle", "country.ISO": "US"}, "recent.orders": [{"order.id": 1, "Total.Amount": 99.9, "shipping.method": "express"}, {"order.id": 2, "Total.Amount": 45.5, "shipping.method": "standard"}], "tags": ["someTag", "another_tag"]});
    expect(caseparser.toSpace(response)).toEqual({"user Id": 42, "First Name": "Ada", "last name": "Lovelace", "birth date": "1815-12-10", "ACCOUNT STATUS": "active", "API VERSION": "v2", "Content Type": "application/json", "created at": "2026-09-24", "Display Name": "Countess", "Preferred language": "en", "Is Verified": true, "profile picture": null, "nick name": "Ada", "MIDDLE NAME": "King", "XML Http Request": false, "html5 Parser": "enabled", "ref": "#/users/42", "type": "User", "discount": 10, "private flag": false, "LAST login AT": "2026-09-01", "billing address": {"Postal Code": "61105", "street name": "Forest Run Circle", "country ISO": "US"}, "recent orders": [{"order id": 1, "Total Amount": 99.9, "shipping method": "express"}, {"order id": 2, "Total Amount": 45.5, "shipping method": "standard"}], "tags": ["someTag", "another_tag"]});
    expect(caseparser.toLower(response)).toEqual({"user id": 42, "first name": "Ada", "last name": "Lovelace", "birth date": "1815-12-10", "account status": "active", "api version": "v2", "content type": "application/json", "created at": "2026-09-24", "display name": "Countess", "preferred language": "en", "is verified": true, "profile picture": null, "nick name": "Ada", "middle name": "King", "xml http request": false, "html5 parser": "enabled", "ref": "#/users/42", "type": "User", "discount": 10, "private flag": false, "last login at": "2026-09-01", "billing address": {"postal code": "61105", "street name": "Forest Run Circle", "country iso": "US"}, "recent orders": [{"order id": 1, "total amount": 99.9, "shipping method": "express"}, {"order id": 2, "total amount": 45.5, "shipping method": "standard"}], "tags": ["someTag", "another_tag"]});
    expect(caseparser.toUpper(response)).toEqual({"USER ID": 42, "FIRST NAME": "Ada", "LAST NAME": "Lovelace", "BIRTH DATE": "1815-12-10", "ACCOUNT STATUS": "active", "API VERSION": "v2", "CONTENT TYPE": "application/json", "CREATED AT": "2026-09-24", "DISPLAY NAME": "Countess", "PREFERRED LANGUAGE": "en", "IS VERIFIED": true, "PROFILE PICTURE": null, "NICK NAME": "Ada", "MIDDLE NAME": "King", "XML HTTP REQUEST": false, "HTML5 PARSER": "enabled", "REF": "#/users/42", "TYPE": "User", "DISCOUNT": 10, "PRIVATE FLAG": false, "LAST LOGIN AT": "2026-09-01", "BILLING ADDRESS": {"POSTAL CODE": "61105", "STREET NAME": "Forest Run Circle", "COUNTRY ISO": "US"}, "RECENT ORDERS": [{"ORDER ID": 1, "TOTAL AMOUNT": 99.9, "SHIPPING METHOD": "express"}, {"ORDER ID": 2, "TOTAL AMOUNT": 45.5, "SHIPPING METHOD": "standard"}], "TAGS": ["someTag", "another_tag"]});
    expect(caseparser.toPath(response, { transform: 'lowercase' })).toEqual({"user/id": 42, "first/name": "Ada", "last/name": "Lovelace", "birth/date": "1815-12-10", "account/status": "active", "api/version": "v2", "content/type": "application/json", "created/at": "2026-09-24", "display/name": "Countess", "preferred/language": "en", "is/verified": true, "profile/picture": null, "nick/name": "Ada", "middle/name": "King", "xml/http/request": false, "html5/parser": "enabled", "ref": "#/users/42", "type": "User", "discount": 10, "private/flag": false, "last/login/at": "2026-09-01", "billing/address": {"postal/code": "61105", "street/name": "Forest Run Circle", "country/iso": "US"}, "recent/orders": [{"order/id": 1, "total/amount": 99.9, "shipping/method": "express"}, {"order/id": 2, "total/amount": 45.5, "shipping/method": "standard"}], "tags": ["someTag", "another_tag"]});
    expect(caseparser.toPath(response, { transform: 'uppercase' })).toEqual({"USER/ID": 42, "FIRST/NAME": "Ada", "LAST/NAME": "Lovelace", "BIRTH/DATE": "1815-12-10", "ACCOUNT/STATUS": "active", "API/VERSION": "v2", "CONTENT/TYPE": "application/json", "CREATED/AT": "2026-09-24", "DISPLAY/NAME": "Countess", "PREFERRED/LANGUAGE": "en", "IS/VERIFIED": true, "PROFILE/PICTURE": null, "NICK/NAME": "Ada", "MIDDLE/NAME": "King", "XML/HTTP/REQUEST": false, "HTML5/PARSER": "enabled", "REF": "#/users/42", "TYPE": "User", "DISCOUNT": 10, "PRIVATE/FLAG": false, "LAST/LOGIN/AT": "2026-09-01", "BILLING/ADDRESS": {"POSTAL/CODE": "61105", "STREET/NAME": "Forest Run Circle", "COUNTRY/ISO": "US"}, "RECENT/ORDERS": [{"ORDER/ID": 1, "TOTAL/AMOUNT": 99.9, "SHIPPING/METHOD": "express"}, {"ORDER/ID": 2, "TOTAL/AMOUNT": 45.5, "SHIPPING/METHOD": "standard"}], "TAGS": ["someTag", "another_tag"]});
    expect(caseparser.toDot(response, { transform: 'lowercase' })).toEqual({"user.id": 42, "first.name": "Ada", "last.name": "Lovelace", "birth.date": "1815-12-10", "account.status": "active", "api.version": "v2", "content.type": "application/json", "created.at": "2026-09-24", "display.name": "Countess", "preferred.language": "en", "is.verified": true, "profile.picture": null, "nick.name": "Ada", "middle.name": "King", "xml.http.request": false, "html5.parser": "enabled", "ref": "#/users/42", "type": "User", "discount": 10, "private.flag": false, "last.login.at": "2026-09-01", "billing.address": {"postal.code": "61105", "street.name": "Forest Run Circle", "country.iso": "US"}, "recent.orders": [{"order.id": 1, "total.amount": 99.9, "shipping.method": "express"}, {"order.id": 2, "total.amount": 45.5, "shipping.method": "standard"}], "tags": ["someTag", "another_tag"]});
    expect(caseparser.toDot(response, { transform: 'uppercase' })).toEqual({"USER.ID": 42, "FIRST.NAME": "Ada", "LAST.NAME": "Lovelace", "BIRTH.DATE": "1815-12-10", "ACCOUNT.STATUS": "active", "API.VERSION": "v2", "CONTENT.TYPE": "application/json", "CREATED.AT": "2026-09-24", "DISPLAY.NAME": "Countess", "PREFERRED.LANGUAGE": "en", "IS.VERIFIED": true, "PROFILE.PICTURE": null, "NICK.NAME": "Ada", "MIDDLE.NAME": "King", "XML.HTTP.REQUEST": false, "HTML5.PARSER": "enabled", "REF": "#/users/42", "TYPE": "User", "DISCOUNT": 10, "PRIVATE.FLAG": false, "LAST.LOGIN.AT": "2026-09-01", "BILLING.ADDRESS": {"POSTAL.CODE": "61105", "STREET.NAME": "Forest Run Circle", "COUNTRY.ISO": "US"}, "RECENT.ORDERS": [{"ORDER.ID": 1, "TOTAL.AMOUNT": 99.9, "SHIPPING.METHOD": "express"}, {"ORDER.ID": 2, "TOTAL.AMOUNT": 45.5, "SHIPPING.METHOD": "standard"}], "TAGS": ["someTag", "another_tag"]});
  });
  test('Should infer the same keys as the runtime conversion', () => {
    expectTypeOf(caseparser.toCamel(response)).toEqualTypeOf<{
      userId: number;
      firstName: string;
      lastName: string;
      birthDate: string;
      accountStatus: string;
      apiVersion: string;
      contentType: string;
      createdAt: string;
      displayName: string;
      preferredLanguage: string;
      isVerified: boolean;
      profilePicture: null;
      nickName: string;
      middleName: string;
      xmlHttpRequest: boolean;
      html5Parser: string;
      ref: string;
      type: string;
      discount: number;
      privateFlag: boolean;
      lastLoginAt: string;
      billingAddress: { postalCode: string; streetName: string; countryIso: string };
      recentOrders: { orderId: number; totalAmount: number; shippingMethod: string }[];
      tags: string[];
    }>();
    expectTypeOf(caseparser.toPascal(response)).toEqualTypeOf<{
      UserId: number;
      FirstName: string;
      LastName: string;
      BirthDate: string;
      AccountStatus: string;
      ApiVersion: string;
      ContentType: string;
      CreatedAt: string;
      DisplayName: string;
      PreferredLanguage: string;
      IsVerified: boolean;
      ProfilePicture: null;
      NickName: string;
      MiddleName: string;
      XmlHttpRequest: boolean;
      Html5Parser: string;
      Ref: string;
      Type: string;
      Discount: number;
      PrivateFlag: boolean;
      LastLoginAt: string;
      BillingAddress: { PostalCode: string; StreetName: string; CountryIso: string };
      RecentOrders: { OrderId: number; TotalAmount: number; ShippingMethod: string }[];
      Tags: string[];
    }>();
    expectTypeOf(caseparser.toSnake(response)).toEqualTypeOf<{
      user_id: number;
      first_name: string;
      last_name: string;
      birth_date: string;
      account_status: string;
      api_version: string;
      content_type: string;
      created_at: string;
      display_name: string;
      preferred_language: string;
      is_verified: boolean;
      profile_picture: null;
      nick_name: string;
      middle_name: string;
      xml_http_request: boolean;
      html5_parser: string;
      ref: string;
      type: string;
      discount: number;
      private_flag: boolean;
      last_login_at: string;
      billing_address: { postal_code: string; street_name: string; country_iso: string };
      recent_orders: { order_id: number; total_amount: number; shipping_method: string }[];
      tags: string[];
    }>();
    expectTypeOf(caseparser.toKebab(response)).toEqualTypeOf<{
      'user-id': number;
      'first-name': string;
      'last-name': string;
      'birth-date': string;
      'account-status': string;
      'api-version': string;
      'content-type': string;
      'created-at': string;
      'display-name': string;
      'preferred-language': string;
      'is-verified': boolean;
      'profile-picture': null;
      'nick-name': string;
      'middle-name': string;
      'xml-http-request': boolean;
      'html5-parser': string;
      ref: string;
      type: string;
      discount: number;
      'private-flag': boolean;
      'last-login-at': string;
      'billing-address': { 'postal-code': string; 'street-name': string; 'country-iso': string };
      'recent-orders': { 'order-id': number; 'total-amount': number; 'shipping-method': string }[];
      tags: string[];
    }>();
    expectTypeOf(caseparser.toUpperSnake(response)).toEqualTypeOf<{
      USER_ID: number;
      FIRST_NAME: string;
      LAST_NAME: string;
      BIRTH_DATE: string;
      ACCOUNT_STATUS: string;
      API_VERSION: string;
      CONTENT_TYPE: string;
      CREATED_AT: string;
      DISPLAY_NAME: string;
      PREFERRED_LANGUAGE: string;
      IS_VERIFIED: boolean;
      PROFILE_PICTURE: null;
      NICK_NAME: string;
      MIDDLE_NAME: string;
      XML_HTTP_REQUEST: boolean;
      HTML5_PARSER: string;
      REF: string;
      TYPE: string;
      DISCOUNT: number;
      PRIVATE_FLAG: boolean;
      LAST_LOGIN_AT: string;
      BILLING_ADDRESS: { POSTAL_CODE: string; STREET_NAME: string; COUNTRY_ISO: string };
      RECENT_ORDERS: { ORDER_ID: number; TOTAL_AMOUNT: number; SHIPPING_METHOD: string }[];
      TAGS: string[];
    }>();
    expectTypeOf(caseparser.toUpperKebab(response)).toEqualTypeOf<{
      'USER-ID': number;
      'FIRST-NAME': string;
      'LAST-NAME': string;
      'BIRTH-DATE': string;
      'ACCOUNT-STATUS': string;
      'API-VERSION': string;
      'CONTENT-TYPE': string;
      'CREATED-AT': string;
      'DISPLAY-NAME': string;
      'PREFERRED-LANGUAGE': string;
      'IS-VERIFIED': boolean;
      'PROFILE-PICTURE': null;
      'NICK-NAME': string;
      'MIDDLE-NAME': string;
      'XML-HTTP-REQUEST': boolean;
      'HTML5-PARSER': string;
      REF: string;
      TYPE: string;
      DISCOUNT: number;
      'PRIVATE-FLAG': boolean;
      'LAST-LOGIN-AT': string;
      'BILLING-ADDRESS': { 'POSTAL-CODE': string; 'STREET-NAME': string; 'COUNTRY-ISO': string };
      'RECENT-ORDERS': { 'ORDER-ID': number; 'TOTAL-AMOUNT': number; 'SHIPPING-METHOD': string }[];
      TAGS: string[];
    }>();
    expectTypeOf(caseparser.toTrain(response)).toEqualTypeOf<{
      'User-Id': number;
      'First-Name': string;
      'Last-Name': string;
      'Birth-Date': string;
      'Account-Status': string;
      'Api-Version': string;
      'Content-Type': string;
      'Created-At': string;
      'Display-Name': string;
      'Preferred-Language': string;
      'Is-Verified': boolean;
      'Profile-Picture': null;
      'Nick-Name': string;
      'Middle-Name': string;
      'Xml-Http-Request': boolean;
      'Html5-Parser': string;
      Ref: string;
      Type: string;
      Discount: number;
      'Private-Flag': boolean;
      'Last-Login-At': string;
      'Billing-Address': { 'Postal-Code': string; 'Street-Name': string; 'Country-Iso': string };
      'Recent-Orders': { 'Order-Id': number; 'Total-Amount': number; 'Shipping-Method': string }[];
      Tags: string[];
    }>();
    expectTypeOf(caseparser.toTitle(response)).toEqualTypeOf<{
      'User Id': number;
      'First Name': string;
      'Last Name': string;
      'Birth Date': string;
      'Account Status': string;
      'Api Version': string;
      'Content Type': string;
      'Created At': string;
      'Display Name': string;
      'Preferred Language': string;
      'Is Verified': boolean;
      'Profile Picture': null;
      'Nick Name': string;
      'Middle Name': string;
      'Xml Http Request': boolean;
      'Html5 Parser': string;
      Ref: string;
      Type: string;
      Discount: number;
      'Private Flag': boolean;
      'Last Login At': string;
      'Billing Address': { 'Postal Code': string; 'Street Name': string; 'Country Iso': string };
      'Recent Orders': { 'Order Id': number; 'Total Amount': number; 'Shipping Method': string }[];
      Tags: string[];
    }>();
    expectTypeOf(caseparser.toSentence(response)).toEqualTypeOf<{
      'User id': number;
      'First name': string;
      'Last name': string;
      'Birth date': string;
      'Account status': string;
      'Api version': string;
      'Content type': string;
      'Created at': string;
      'Display name': string;
      'Preferred language': string;
      'Is verified': boolean;
      'Profile picture': null;
      'Nick name': string;
      'Middle name': string;
      'Xml http request': boolean;
      'Html5 parser': string;
      Ref: string;
      Type: string;
      Discount: number;
      'Private flag': boolean;
      'Last login at': string;
      'Billing address': { 'Postal code': string; 'Street name': string; 'Country iso': string };
      'Recent orders': { 'Order id': number; 'Total amount': number; 'Shipping method': string }[];
      Tags: string[];
    }>();
    expectTypeOf(caseparser.toPascalSnake(response)).toEqualTypeOf<{
      User_Id: number;
      First_Name: string;
      Last_Name: string;
      Birth_Date: string;
      Account_Status: string;
      Api_Version: string;
      Content_Type: string;
      Created_At: string;
      Display_Name: string;
      Preferred_Language: string;
      Is_Verified: boolean;
      Profile_Picture: null;
      Nick_Name: string;
      Middle_Name: string;
      Xml_Http_Request: boolean;
      Html5_Parser: string;
      Ref: string;
      Type: string;
      Discount: number;
      Private_Flag: boolean;
      Last_Login_At: string;
      Billing_Address: { Postal_Code: string; Street_Name: string; Country_Iso: string };
      Recent_Orders: { Order_Id: number; Total_Amount: number; Shipping_Method: string }[];
      Tags: string[];
    }>();
    expectTypeOf(caseparser.toPath(response)).toEqualTypeOf<{
      'user/Id': number;
      'First/Name': string;
      'last/name': string;
      'birth/date': string;
      'ACCOUNT/STATUS': string;
      'API/VERSION': string;
      'Content/Type': string;
      'created/at': string;
      'Display/Name': string;
      'Preferred/language': string;
      'Is/Verified': boolean;
      'profile/picture': null;
      'nick/name': string;
      'MIDDLE/NAME': string;
      'XML/Http/Request': boolean;
      'html5/Parser': string;
      ref: string;
      type: string;
      discount: number;
      'private/flag': boolean;
      'LAST/login/AT': string;
      'billing/address': { 'Postal/Code': string; 'street/name': string; 'country/ISO': string };
      'recent/orders': { 'order/id': number; 'Total/Amount': number; 'shipping/method': string }[];
      tags: string[];
    }>();
    expectTypeOf(caseparser.toDot(response)).toEqualTypeOf<{
      'user.Id': number;
      'First.Name': string;
      'last.name': string;
      'birth.date': string;
      'ACCOUNT.STATUS': string;
      'API.VERSION': string;
      'Content.Type': string;
      'created.at': string;
      'Display.Name': string;
      'Preferred.language': string;
      'Is.Verified': boolean;
      'profile.picture': null;
      'nick.name': string;
      'MIDDLE.NAME': string;
      'XML.Http.Request': boolean;
      'html5.Parser': string;
      ref: string;
      type: string;
      discount: number;
      'private.flag': boolean;
      'LAST.login.AT': string;
      'billing.address': { 'Postal.Code': string; 'street.name': string; 'country.ISO': string };
      'recent.orders': { 'order.id': number; 'Total.Amount': number; 'shipping.method': string }[];
      tags: string[];
    }>();
    expectTypeOf(caseparser.toSpace(response)).toEqualTypeOf<{
      'user Id': number;
      'First Name': string;
      'last name': string;
      'birth date': string;
      'ACCOUNT STATUS': string;
      'API VERSION': string;
      'Content Type': string;
      'created at': string;
      'Display Name': string;
      'Preferred language': string;
      'Is Verified': boolean;
      'profile picture': null;
      'nick name': string;
      'MIDDLE NAME': string;
      'XML Http Request': boolean;
      'html5 Parser': string;
      ref: string;
      type: string;
      discount: number;
      'private flag': boolean;
      'LAST login AT': string;
      'billing address': { 'Postal Code': string; 'street name': string; 'country ISO': string };
      'recent orders': { 'order id': number; 'Total Amount': number; 'shipping method': string }[];
      tags: string[];
    }>();
    expectTypeOf(caseparser.toLower(response)).toEqualTypeOf<{
      'user id': number;
      'first name': string;
      'last name': string;
      'birth date': string;
      'account status': string;
      'api version': string;
      'content type': string;
      'created at': string;
      'display name': string;
      'preferred language': string;
      'is verified': boolean;
      'profile picture': null;
      'nick name': string;
      'middle name': string;
      'xml http request': boolean;
      'html5 parser': string;
      ref: string;
      type: string;
      discount: number;
      'private flag': boolean;
      'last login at': string;
      'billing address': { 'postal code': string; 'street name': string; 'country iso': string };
      'recent orders': { 'order id': number; 'total amount': number; 'shipping method': string }[];
      tags: string[];
    }>();
    expectTypeOf(caseparser.toUpper(response)).toEqualTypeOf<{
      'USER ID': number;
      'FIRST NAME': string;
      'LAST NAME': string;
      'BIRTH DATE': string;
      'ACCOUNT STATUS': string;
      'API VERSION': string;
      'CONTENT TYPE': string;
      'CREATED AT': string;
      'DISPLAY NAME': string;
      'PREFERRED LANGUAGE': string;
      'IS VERIFIED': boolean;
      'PROFILE PICTURE': null;
      'NICK NAME': string;
      'MIDDLE NAME': string;
      'XML HTTP REQUEST': boolean;
      'HTML5 PARSER': string;
      REF: string;
      TYPE: string;
      DISCOUNT: number;
      'PRIVATE FLAG': boolean;
      'LAST LOGIN AT': string;
      'BILLING ADDRESS': { 'POSTAL CODE': string; 'STREET NAME': string; 'COUNTRY ISO': string };
      'RECENT ORDERS': { 'ORDER ID': number; 'TOTAL AMOUNT': number; 'SHIPPING METHOD': string }[];
      TAGS: string[];
    }>();
    expectTypeOf(caseparser.toPath(response, { transform: 'lowercase' })).toEqualTypeOf<{
      'user/id': number;
      'first/name': string;
      'last/name': string;
      'birth/date': string;
      'account/status': string;
      'api/version': string;
      'content/type': string;
      'created/at': string;
      'display/name': string;
      'preferred/language': string;
      'is/verified': boolean;
      'profile/picture': null;
      'nick/name': string;
      'middle/name': string;
      'xml/http/request': boolean;
      'html5/parser': string;
      ref: string;
      type: string;
      discount: number;
      'private/flag': boolean;
      'last/login/at': string;
      'billing/address': { 'postal/code': string; 'street/name': string; 'country/iso': string };
      'recent/orders': { 'order/id': number; 'total/amount': number; 'shipping/method': string }[];
      tags: string[];
    }>();
    expectTypeOf(caseparser.toPath(response, { transform: 'uppercase' })).toEqualTypeOf<{
      'USER/ID': number;
      'FIRST/NAME': string;
      'LAST/NAME': string;
      'BIRTH/DATE': string;
      'ACCOUNT/STATUS': string;
      'API/VERSION': string;
      'CONTENT/TYPE': string;
      'CREATED/AT': string;
      'DISPLAY/NAME': string;
      'PREFERRED/LANGUAGE': string;
      'IS/VERIFIED': boolean;
      'PROFILE/PICTURE': null;
      'NICK/NAME': string;
      'MIDDLE/NAME': string;
      'XML/HTTP/REQUEST': boolean;
      'HTML5/PARSER': string;
      REF: string;
      TYPE: string;
      DISCOUNT: number;
      'PRIVATE/FLAG': boolean;
      'LAST/LOGIN/AT': string;
      'BILLING/ADDRESS': { 'POSTAL/CODE': string; 'STREET/NAME': string; 'COUNTRY/ISO': string };
      'RECENT/ORDERS': { 'ORDER/ID': number; 'TOTAL/AMOUNT': number; 'SHIPPING/METHOD': string }[];
      TAGS: string[];
    }>();
    expectTypeOf(caseparser.toDot(response, { transform: 'lowercase' })).toEqualTypeOf<{
      'user.id': number;
      'first.name': string;
      'last.name': string;
      'birth.date': string;
      'account.status': string;
      'api.version': string;
      'content.type': string;
      'created.at': string;
      'display.name': string;
      'preferred.language': string;
      'is.verified': boolean;
      'profile.picture': null;
      'nick.name': string;
      'middle.name': string;
      'xml.http.request': boolean;
      'html5.parser': string;
      ref: string;
      type: string;
      discount: number;
      'private.flag': boolean;
      'last.login.at': string;
      'billing.address': { 'postal.code': string; 'street.name': string; 'country.iso': string };
      'recent.orders': { 'order.id': number; 'total.amount': number; 'shipping.method': string }[];
      tags: string[];
    }>();
    expectTypeOf(caseparser.toDot(response, { transform: 'uppercase' })).toEqualTypeOf<{
      'USER.ID': number;
      'FIRST.NAME': string;
      'LAST.NAME': string;
      'BIRTH.DATE': string;
      'ACCOUNT.STATUS': string;
      'API.VERSION': string;
      'CONTENT.TYPE': string;
      'CREATED.AT': string;
      'DISPLAY.NAME': string;
      'PREFERRED.LANGUAGE': string;
      'IS.VERIFIED': boolean;
      'PROFILE.PICTURE': null;
      'NICK.NAME': string;
      'MIDDLE.NAME': string;
      'XML.HTTP.REQUEST': boolean;
      'HTML5.PARSER': string;
      REF: string;
      TYPE: string;
      DISCOUNT: number;
      'PRIVATE.FLAG': boolean;
      'LAST.LOGIN.AT': string;
      'BILLING.ADDRESS': { 'POSTAL.CODE': string; 'STREET.NAME': string; 'COUNTRY.ISO': string };
      'RECENT.ORDERS': { 'ORDER.ID': number; 'TOTAL.AMOUNT': number; 'SHIPPING.METHOD': string }[];
      TAGS: string[];
    }>();
  });
  test('Should keep or remove symbols in every key', () => {
    expect(Object.keys(caseparser.toCamel(response, true)).slice(16, 19)).toEqual(['$ref', '@type', 'discount%']);
    expect(Object.keys(caseparser.toCamel(response, { allowSymbols: ['@'] })).slice(16, 19)).toEqual(['ref', '@type', 'discount']);
    expect(caseparser.toPath({ 'profile/picture': null }, true)).toEqual({ 'profile/picture': null });
    expectTypeOf(caseparser.toPath({ 'profile/picture': null }, true)).toEqualTypeOf<{ 'profile/picture': null }>();
  });
});

describe('toX types', () => {
  test('Should infer keys with symbols removed, kept or partially kept', () => {
    const data = { $ref: 1, '@type': 'x', user_id: 2 };
    expectTypeOf(caseparser.toCamel(data)).toEqualTypeOf<{ ref: number; type: string; userId: number }>();
    expectTypeOf(caseparser.toCamel(data, false)).toEqualTypeOf<{ ref: number; type: string; userId: number }>();
    expectTypeOf(caseparser.toCamel(data, true)).toEqualTypeOf<{ $ref: number; '@type': string; userId: number }>();
    expectTypeOf(caseparser.toCamel(data, ['$'])).toEqualTypeOf<{ $ref: number; type: string; userId: number }>();
    expectTypeOf(caseparser.toPascal({ $first_name: 1 }, true)).toEqualTypeOf<{ $FirstName: number }>();
    expectTypeOf(caseparser.toPath({ UserProfile: 1, userID: 2 })).toEqualTypeOf<{ 'User/Profile': number; 'user/ID': number }>();
    expectTypeOf(caseparser.toDot({ UserProfile: 1 })).toEqualTypeOf<{ 'User.Profile': number }>();
    expectTypeOf(caseparser.toSentence({ '@first_name': 1 }, ['@'])).toEqualTypeOf<{ '@First name': number }>();
    expectTypeOf(caseparser.toPascal({ $$hello$World$$hi: 1 })).toEqualTypeOf<{ HelloWorldHi: number }>();
    expectTypeOf(caseparser.toSnake({ $$hello$World$$hi: 1, 'total%': 2 }, true)).toEqualTypeOf<{ $$hello_$world_$$hi: number; 'total%': number }>();
  });
  test('Should fall back to string keys when allowSymbols is only known at runtime', () => {
    const data = { $ref: 1 };
    expectTypeOf(caseparser.toCamel(data, true as boolean)).toEqualTypeOf<{ [x: string]: number }>();
    expectTypeOf(caseparser.toCamel(data, [] as string[])).toEqualTypeOf<{ [x: string]: number }>();
  });
  test('Should infer keys from the options object', () => {
    const data = { $ref: 1, '@type': 'x', user_id: 2 };
    expectTypeOf(caseparser.toCamel(data, {})).toEqualTypeOf<{ ref: number; type: string; userId: number }>();
    expectTypeOf(caseparser.toCamel(data, { allowSymbols: true })).toEqualTypeOf<{ $ref: number; '@type': string; userId: number }>();
    expectTypeOf(caseparser.toCamel(data, { allowSymbols: ['$'] })).toEqualTypeOf<{ $ref: number; type: string; userId: number }>();
    expectTypeOf(caseparser.toCamel(data, { allowSymbols: true as boolean })).toEqualTypeOf<{ [x: string]: number | string }>();
  });
  test('Should infer transformed keys in toDot and toPath', () => {
    const data = { UserProfile: 1, $userID: 2 };
    expectTypeOf(caseparser.toDot(data, {})).toEqualTypeOf<{ 'User.Profile': number; 'user.ID': number }>();
    expectTypeOf(caseparser.toDot(data, { transform: 'lowercase' })).toEqualTypeOf<{ 'user.profile': number; 'user.id': number }>();
    expectTypeOf(caseparser.toPath(data, { transform: 'uppercase' })).toEqualTypeOf<{ 'USER/PROFILE': number; 'USER/ID': number }>();
    expectTypeOf(caseparser.toPath(data, { allowSymbols: ['$'], transform: 'lowercase' })).toEqualTypeOf<{ 'user/profile': number; '$user/id': number }>();
    expectTypeOf(caseparser.toDot(data, { transform: 'lowercase' as caseparser.Transform })).toEqualTypeOf<{ [x: string]: number }>();
  });
  test('Should infer toPath keys split on / and \\, joined with the separator', () => {
    expectTypeOf(caseparser.toPath({ 'profile/picture': 1, 'api\\v2': 2 }, true)).toEqualTypeOf<{ 'profile/picture': number; 'api/v2': number }>();
    expectTypeOf(caseparser.toPath({ UserProfile: 1 }, { separator: '\\' })).toEqualTypeOf<{ 'User\\Profile': number }>();
    expectTypeOf(caseparser.toPath({ UserProfile: 1 }, { separator: '/' })).toEqualTypeOf<{ 'User/Profile': number }>();
    expectTypeOf(caseparser.toPath({ 'Users/ProfileId': 1 }, { separator: '\\', transform: 'lowercase' })).toEqualTypeOf<{ 'users\\profile\\id': number }>();
    expectTypeOf(caseparser.toSnake({ 'profile/picture': 1 }, true)).toEqualTypeOf<{ 'profile_/picture': number }>();
    // @ts-expect-error separator is not an option of toDot
    caseparser.toDot({ a: 1 }, { separator: '\\' });
  });
  test('Should only accept transform in toDot and toPath', () => {
    // @ts-expect-error transform is not an option of toSnake
    caseparser.toSnake({ a: 1 }, { transform: 'uppercase' });
    // @ts-expect-error transform is not an option of toSpace
    caseparser.toSpace({ a: 1 }, { transform: 'lowercase' });
  });
  test('Should infer the converted keys from any case, deeply', () => {
    const data = {
      user_id: 1,
      'Last-Name': 'Doe',
      XMLHttpRequest: true,
      'Home Addresses': [{ POSTAL_CODE: '61105' }],
    };
    expectTypeOf(caseparser.toCamel(data)).toEqualTypeOf<{
      userId: number;
      lastName: string;
      xmlHttpRequest: boolean;
      homeAddresses: { postalCode: string }[];
    }>();
    expectTypeOf(caseparser.toSnake(data)).toEqualTypeOf<{
      user_id: number;
      last_name: string;
      xml_http_request: boolean;
      home_addresses: { postal_code: string }[];
    }>();
    expectTypeOf(caseparser.toSentence(data)).toEqualTypeOf<{
      'User id': number;
      'Last name': string;
      'Xml http request': boolean;
      'Home addresses': { 'Postal code': string }[];
    }>();
  });
  test('Should split words in types the same way as at runtime', () => {
    const keys = { userID: 1, getHTTPResponseCode: 1, 'X-API-Key': 1, html5Parser: 1, v2Api: 1, '__leading--double..sep  ': 1 };
    expectTypeOf(caseparser.toKebab(keys)).toEqualTypeOf<{
      'user-id': number;
      'get-http-response-code': number;
      'x-api-key': number;
      'html5-parser': number;
      'v2-api': number;
      'leading-double-sep': number;
    }>();
  });
  test('Should keep string keys and string inputs as string', () => {
    expectTypeOf(caseparser.toCamel({} as Record<string, number>)).toEqualTypeOf<{ [x: string]: number }>();
    expectTypeOf(caseparser.toCamel('hello_world')).toEqualTypeOf<string>();
  });
});
