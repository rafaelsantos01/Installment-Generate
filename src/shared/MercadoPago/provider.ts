import { Injectable } from '@nestjs/common';
import { Payment, MercadoPagoConfig } from 'mercadopago';

@Injectable()
export default class MercadoPagoProvider {
  public async createPayment(data: IRequest) {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const now = new Date();
    now.setHours(now.getHours());
    const format = now.toISOString().replace('Z', '-04:00');

    const payment = new Payment(client);

    await payment
      .create({
        body: {
          transaction_amount: data.transaction_amount,
          token: client.accessToken,
          description: data.description,
          installments: 1,
          payment_method_id: 'pix',
          issuer_id: 1,
          date_of_expiration: format,
          payer: {
            first_name: data.payer.name,
            email: data.payer.email,
          },
          additional_info: {
            items: [
              {
                id: data.items.id,
                title: data.items.title,
                description: data.items.description,
                picture_url: data.items.picture_url,
                category_id: data.items.category_id,
                quantity: data.items.quantity,
                unit_price: data.items.unit_price,
              },
            ],
            payer: {
              first_name: data.payer.name,
            },
          },
        },
      })
      .then((result) => {
        // console.log(result.additional_info.items);
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.log(error);
        throw new Error('Erro ao criar pagamento: ' + error.message);
      });
  }
}

interface IRequest {
  //issuer_id: number;
  //installments: number;
  transaction_amount: number;
  description: string;
  payer: {
    email: string;
    name: string;
  };
  items: {
    id: string;
    title: string;
    description: string;
    picture_url: string;
    category_id: string;
    quantity: number;
    unit_price: number;
  };
}

// {
//   id: 1321136961,
//   date_created: '2024-02-11T15:01:50.025-04:00',
//   date_approved: null,
//   date_last_updated: '2024-02-11T15:01:50.025-04:00',
//   date_of_expiration: '2024-02-12T15:01:49.803-04:00',
//   money_release_date: null,
//   money_release_status: 'released',
//   operation_type: 'regular_payment',
//   issuer_id: '12501',
//   payment_method_id: 'pix',
//   payment_type_id: 'bank_transfer',
//   payment_method: { id: 'pix', type: 'bank_transfer', issuer_id: '12501' },
//   status: 'pending',
//   status_detail: 'pending_waiting_transfer',
//   currency_id: 'BRL',
//   description: 'teste',
//   live_mode: false,
//   sponsor_id: null,
//   authorization_code: null,
//   money_release_schema: null,
//   taxes_amount: 0,
//   counter_currency: null,
//   brand_id: null,
//   shipping_amount: 0,
//   build_version: '3.37.0',
//   pos_id: null,
//   store_id: null,
//   integrator_id: null,
//   platform_id: null,
//   corporation_id: null,
//   payer: {
//     identification: { number: '32659430', type: 'DNI' },
//     entity_type: null,
//     phone: { number: null, extension: null, area_code: null },
//     last_name: null,
//     id: '1677252201',
//     type: null,
//     first_name: null,
//     email: 'test_user_80507629@testuser.com'
//   },
//   collector_id: 150933942,
//   marketplace_owner: null,
//   metadata: {},
//   additional_info: {
//     available_balance: null,
//     nsu_processadora: null,
//     authentication_code: null
//   },
//   order: {},
//   external_reference: null,
//   transaction_amount: 10,
//   transaction_amount_refunded: 0,
//   coupon_amount: 0,
//   differential_pricing_id: null,
//   financing_group: null,
//   deduction_schema: null,
//   callback_url: null,
//   installments: 1,
//   transaction_details: {
//     payment_method_reference_id: null,
//     acquirer_reference: null,
//     net_received_amount: 0,
//     total_paid_amount: 10,
//     overpaid_amount: 0,
//     external_resource_url: null,
//     installment_amount: 0,
//     financial_institution: null,
//     payable_deferral_period: null,
//     bank_transfer_id: null,
//     transaction_id: null
//   },
//   fee_details: [],
//   charges_details: [
//     {
//       id: '1321136961-001',
//       name: 'mercadopago_fee',
//       type: 'fee',
//       accounts: [Object],
//       client_id: 0,
//       date_created: '2024-02-11T15:01:50.028-04:00',
//       last_updated: '2024-02-11T15:01:50.028-04:00',
//       amounts: [Object],
//       metadata: {},
//       reserve_id: null,
//       refund_charges: []
//     }
//   ],
//   captured: true,
//   binary_mode: false,
//   call_for_authorize_id: null,
//   statement_descriptor: null,
//   card: {},
//   notification_url: null,
//   refunds: [],
//   processing_mode: 'aggregator',
//   merchant_account_id: null,
//   merchant_number: null,
//   acquirer_reconciliation: [],
//   point_of_interaction: {
//     type: 'OPENPLATFORM',
//     business_info: { unit: 'online_payments', sub_unit: 'sdk', branch: null },
//     location: { state_id: null, source: null },
//     application_data: { name: null, version: null },
//     transaction_data: {
//       qr_code: '00020126580014br.gov.bcb.pix0136b76aa9c2-2ec4-4110-954e-ebfe34f05b61520400005303986540510.005802BR5913RABQ AhhLbkSC6007BrJTYue62230519mpqrinter13211369616304CC96',
//       bank_transfer_id: null,
//       transaction_id: null,
//       e2e_id: null,
//       financial_institution: null,
//       ticket_url: 'https://www.mercadopago.com.br/sandbox/payments/1321136961/ticket?caller_id=1677252201&hash=e360ead9-937e-49f4-b812-eadf6b8e125d',
//       bank_info: [Object],
//       qr_code_base64: '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'
//     }
//   },
//   accounts_info: null,
//   tags: null,
//   api_response: {
//     status: 201,
//     headers: [Object: null prototype] {
//       date: [Array],
//       'content-type': [Array],
//       'transfer-encoding': [Array],
//       connection: [Array],
//       'x-site-id': [Array],
//       'x-response-status': [Array],
//       'x-caller-id': [Array],
//       vary: [Array],
//       'cache-control': [Array],
//       etag: [Array],
//       'x-content-type-options': [Array],
//       'x-request-id': [Array],
//       'x-xss-protection': [Array],
//       'strict-transport-security': [Array],
//       'access-control-allow-origin': [Array],
//       'access-control-allow-headers': [Array],
//       'access-control-allow-methods': [Array],
//       'access-control-max-age': [Array],
//       'timing-allow-origin': [Array]
//     }
//   }
// }
