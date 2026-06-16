import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g., Starter, Growth, Enterprise',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'monthlyPrice',
      title: 'Monthly Price',
      type: 'number',
    }),
    defineField({
      name: 'yearlyPrice',
      title: 'Yearly Price',
      type: 'number',
      description: 'Discounted yearly price (typically 20% discount)',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'USD ($)', value: 'USD' },
          { title: 'IDR (Rp)', value: 'IDR' },
        ],
      },
      initialValue: 'USD',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Short description of who this plan is for',
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Pricing Feature',
          fields: [
            { name: 'label', title: 'Feature Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'included', title: 'Included', type: 'boolean', initialValue: true },
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      initialValue: 'Mulai Gratis',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA Button URL',
      type: 'string',
      initialValue: '/demo',
    }),
    defineField({
      name: 'isPopular',
      title: 'Is Popular',
      type: 'boolean',
      description: 'Highlight this plan as "Most Popular"',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      price: 'monthlyPrice',
      currency: 'currency',
    },
    prepare(selection) {
      const { title, price, currency } = selection;
      const currencySymbol = currency === 'USD' ? '$' : 'Rp';
      return {
        title,
        subtitle: price !== undefined ? `${currencySymbol}${price}/bulan` : 'Custom Pricing',
      };
    },
  },
});
