'use client';

import * as React from 'react';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { dayjs } from '@/lib/dayjs';

// Invoice data should be received as a prop.
// For the sake of simplicity, we are using a hardcoded data.

export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  currency: string;
  unitAmount: number;
  totalAmount: number;
}

const lineItems = [
  { id: 'LI-001', name: 'Pro Subscription', quantity: 1, currency: 'USD', unitAmount: 14.99, totalAmount: 14.99 },
] satisfies LineItem[];

const styles = StyleSheet.create({
  // Utils
  fontMedium: { fontWeight: 500 },
  fontSemibold: { fontWeight: 600 },
  textLg: { fontSize: 10, lineHeight: 1.5 },
  textXl: { fontSize: 18, lineHeight: 1.6 },
  textRight: { textAlign: 'right' },
  uppercase: { textTransform: 'uppercase' },
  gutterBottom: { marginBottom: 4 },
  flexGrow: { flexGrow: 1 },
  flexRow: { flexDirection: 'row' },
  flexColumn: { flexDirection: 'column' },
  w50: { width: '50%' },
  // Components
  page: { backgroundColor: '#FFFFFF', gap: 32, padding: 24, fontSize: 10, fontWeight: 400, lineHeight: 1.43 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  brand: { height: 40, width: 40 },
  refs: { gap: 8 },
  refRow: { flexDirection: 'row' },
  refDescription: { fontWeight: 500, width: 100 },
  items: { borderWidth: 1, borderStyle: 'solid', borderColor: '#EEEEEE', borderRadius: 4 },
  itemRow: { borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#EEEEEE', flexDirection: 'row' },
  itemNumber: { padding: 6, width: '10%' },
  itemDescription: { padding: 6, width: '50%' },
  itemQty: { padding: 6, width: '10%' },
  itemUnitAmount: { padding: 6, width: '15%' },
  itemTotalAmount: { padding: 6, width: '15%' },
  summaryRow: { flexDirection: 'row' },
  summaryGap: { padding: 6, width: '70%' },
  summaryTitle: { padding: 6, width: '15%' },
  summaryValue: { padding: 6, width: '15%' },
});

export interface InvoicePDFDocumentProps {
  invoice: unknown;
}

export function InvoicePDFDocument(_: InvoicePDFDocumentProps): React.JSX.Element {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.flexGrow}>
            <Text style={[styles.textXl, styles.fontSemibold]}>Invoice</Text>
          </View>
          <View>
            <Image source="/assets/logo-emblem--dark.png" style={styles.brand} />
          </View>
        </View>
        <View style={styles.refs}>
          <View style={styles.refRow}>
            <Text style={styles.refDescription}>Number:</Text>
            <Text>INV-001</Text>
          </View>
          <View style={styles.refRow}>
            <Text style={styles.refDescription}>Due Date:</Text>
            <Text>{dayjs().add(15, 'day').format('MMM D, YYYY')}</Text>
          </View>
          <View style={styles.refRow}>
            <Text style={styles.refDescription}>Issue Date:</Text>
            <Text>{dayjs().subtract(1, 'hour').format('MMM D, YYYY')}</Text>
          </View>
          <View style={styles.refRow}>
            <Text style={styles.refDescription}>Issuer VAT No:</Text>
            <Text>RO4675933</Text>
          </View>
        </View>
        <View style={styles.flexRow}>
          <View style={styles.w50}>
            <Text style={[styles.fontMedium, styles.gutterBottom]}>Devias IO</Text>
            <Text>2674 Alfred Drive</Text>
            <Text>Brooklyn, New York, United States</Text>
            <Text>11206</Text>
            <Text>accounts@devias.io</Text>
            <Text>(+1) 757 737 1980</Text>
          </View>
          <View style={styles.w50}>
            <Text style={[styles.fontMedium, styles.gutterBottom]}>Billed To</Text>
            <Text>Miron Vitold</Text>
            <Text>Acme Inc.</Text>
            <Text>1721 Bartlett Avenue</Text>
            <Text>Southfield, Michigan, United States</Text>
            <Text>48034</Text>
            <Text>RO8795621</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.textLg, styles.fontSemibold]}>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(19.99)} due{' '}
            {dayjs().add(15, 'day').format('MMM D, YYYY')}
          </Text>
        </View>
        <View>
          <View style={styles.items}>
            <View style={styles.itemRow}>
              <View style={styles.itemNumber}>
                <Text style={styles.fontSemibold}>#</Text>
              </View>
              <View style={styles.itemDescription}>
                <Text style={styles.fontSemibold}>Name</Text>
              </View>
              <View style={styles.itemUnitAmount}>
                <Text style={styles.fontSemibold}>Unit Price</Text>
              </View>
              <View style={styles.itemQty}>
                <Text style={styles.fontSemibold}>Qty</Text>
              </View>
              <View style={styles.itemTotalAmount}>
                <Text style={[styles.fontSemibold, styles.textRight]}>Amount</Text>
              </View>
            </View>
            {lineItems.map((lineItem, index) => (
              <View key={lineItem.id} style={styles.itemRow}>
                <View style={styles.itemNumber}>
                  <Text>{index + 1}</Text>
                </View>
                <View style={styles.itemDescription}>
                  <Text>{lineItem.name}</Text>
                </View>
                <View style={styles.itemUnitAmount}>
                  <Text>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: lineItem.currency }).format(
                      lineItem.unitAmount
                    )}
                  </Text>
                </View>
                <View style={styles.itemQty}>
                  <Text>{lineItem.quantity}</Text>
                </View>
                <View style={styles.itemTotalAmount}>
                  <Text style={styles.textRight}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: lineItem.currency }).format(
                      lineItem.totalAmount
                    )}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryGap} />
              <View style={styles.summaryTitle}>
                <Text>Subtotal</Text>
              </View>
              <View style={styles.summaryValue}>
                <Text style={styles.textRight}>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(14.99)}
                </Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryGap} />
              <View style={styles.summaryTitle}>
                <Text>Taxes</Text>
              </View>
              <View style={styles.summaryValue}>
                <Text style={styles.textRight}>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(5)}
                </Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryGap} />
              <View style={styles.summaryTitle}>
                <Text>Total</Text>
              </View>
              <View style={styles.summaryValue}>
                <Text style={styles.textRight}>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(19.99)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={[styles.textLg, styles.fontSemibold, styles.gutterBottom]}>Notes</Text>
          <Text>
            Please make sure you have the right bank registration number as I had issues before and make sure you cover
            transfer expenses.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
