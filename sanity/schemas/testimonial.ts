import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      description: 'Quote content (max 280 characters)',
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title / Designation',
      type: 'string',
      description: 'e.g., CTO di PT Maju Jaya',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorPhoto',
      title: 'Author Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating from 1 to 5',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'caseStudyUrl',
      title: 'Case Study URL',
      type: 'string',
      description: 'Link to a full case study page (optional)',
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
      title: 'authorName',
      subtitle: 'authorTitle',
      media: 'authorPhoto',
    },
  },
});
