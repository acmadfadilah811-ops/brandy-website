import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'integration',
  title: 'Integration',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Communication', value: 'Communication' },
          { title: 'Productivity', value: 'Productivity' },
          { title: 'CRM', value: 'CRM' },
          { title: 'Video', value: 'Video' },
          { title: 'Automation', value: 'Automation' },
          { title: 'Payment', value: 'Payment' },
          { title: 'Email', value: 'Email' },
          { title: 'Development', value: 'Development' },
          { title: 'Project Management', value: 'Project Mgmt' },
          { title: 'Documentation', value: 'Documentation' },
          { title: 'Messaging', value: 'Messaging' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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
      subtitle: 'category',
      media: 'logo',
    },
  },
});
