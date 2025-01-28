// import { NavItem } from '@/src/types'

export type User = {
  id: number
  name: string
  company: string
  role: string
  verified: boolean
  status: string
}
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active',
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active',
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive',
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active',
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active',
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active',
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active',
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active',
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
  },
]

export const defaultEmailTemplate = {
  counters: {
    u_row: 6,
    u_column: 5,
    u_content_text: 5,
    u_content_divider: 3,
    u_content_button: 2,
  },
  body: {
    id: undefined,
    rows: [
      {
        id: 'row1',
        cells: [1],
        columns: [
          {
            id: 'column1',
            contents: [
              {
                type: 'text',
                values: {
                  text: `Hello {{${'user_name'}}},<br>Welcome to our service!`,
                },
              },
            ],
            values: {},
          },
        ],
        values: {},
      },
      {
        id: 'row2',
        cells: [1],
        columns: [
          {
            id: 'column2',
            contents: [
              {
                type: 'divider',
              },
            ],
            values: {},
          },
        ],
        values: {},
      },
      {
        id: 'row3',
        cells: [1],
        columns: [
          {
            id: 'column3',
            contents: [
              {
                type: 'text',
                values: {
                  text: 'Thank you for joining us. We are excited to have you!',
                },
              },
            ],
            values: {},
          },
        ],
        values: {},
      },
      {
        id: 'row4',
        cells: [1],
        columns: [
          {
            id: 'column4',
            contents: [
              {
                type: 'button',
                values: {
                  text: 'Get Started Now',
                  link: 'https://your-link.com/get-started', // Update with your link
                  style: {
                    backgroundColor: '#007BFF',
                    color: '#FFFFFF',
                    padding: '10px 20px',
                    borderRadius: '5px',
                  }, // Example styles
                },
              },
            ],
            values: {},
          },
        ],
        values: {},
      },
      {
        id: 'row5',
        cells: [1],
        columns: [
          {
            id: 'column5',
            contents: [
              {
                type: 'text',
                values: {
                  text: '<h3>Explore Our Features</h3><ul><li>Feature 1</li><li>Feature 2</li><li>Feature 3</li></ul>',
                },
              },
            ],
            values: {},
          },
        ],
        values: {},
      },
      // New Row 6 with Divider
      {
        id: 'row6',
        cells: [1],
        columns: [
          {
            id: 'column6',
            contents: [
              {
                type: 'divider',
              },
            ],
            values: {},
          },
        ],
        values: {},
      },
      // New Row 7 for Footer Text
      {
        id: 'row7',
        cells: [1],
        columns: [
          {
            id: 'column7',
            contents: [
              {
                type: 'text',
                values: {
                  text: '© 2024 Your Company. All rights reserved.<br><a href="https://your-link.com/privacy-policy">Privacy Policy</a>',
                },
              },
            ],
            values: {},
          },
        ],
        values: {},
      },
      // Additional default template content...
    ],
    headers: [],
    footers: [],
    values: {},
  },
}

export const varibleStaticArray: Array<{ value: string; label: string }> = [
  { value: 'user_name', label: 'user_label' },
  { value: 'product', label: 'product' },
]
