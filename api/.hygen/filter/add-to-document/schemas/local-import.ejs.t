---
inject: true
to: src/schemas/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.schema.ts
at_line: 0
skip_if: <% if (kind === 'reference') { -%>import { objectId <% } else if (kind === 'enum') { -%>import { <%= enumType %><% } else { -%><%= true %><% } -%>
---
<% if (kind === 'reference') { -%>
  import { objectId } from './common'
<% } else if (kind === 'enum') { -%>
  import { <%= enumType %> } from './../utils/enum';
<% } else if (kind === 'fromTo' || (type && type === 'date')) { -%>
  import { stringToDate } from './common'
<% } -%>