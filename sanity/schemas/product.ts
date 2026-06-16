import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A single-sentence tagline for the product',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Product icon (SVG/PNG, 1:1)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Screenshot / hero visual of the product',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'demoVideo',
      title: 'Demo Video URL',
      type: 'url',
      description: 'Link to a demo video (YouTube/Vimeo)',
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Feature Item',
          fields: [
            { name: 'icon', title: 'Icon (Lucide name)', type: 'string' },
            { name: 'title', title: 'Feature Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Feature Description', type: 'text', validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
    defineField({
      name: 'integrations',
      title: 'Supported Integrations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'integration' }],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'icon',
    },
  },
});
