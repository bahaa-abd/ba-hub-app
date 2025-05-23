---
inject: true
to: src/database/models/<%= nameDash %>.model.ts
after:  \<creating\-property\-schema \/\>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= property %>Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: '<%= Type %>',
    },
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: '<%= Type %>',
        default: []
      }]
    },
  <% } -%>
<% } else if (kind === 'local') { -%>
      <%= h.inflection.camelize(property, true) %>: {
        type: <% if (isArray) {-%>[<% }-%>localStringSchema<% if (isArray) {-%>]<% }-%>,
        of: String,
        <% if (isArray) {-%>default: [],<% }-%>
      },
<% } else if (kind === 'enum') { -%>
  <%= property %>:<% if (isArray) {-%>[ <% }-%>{
      type: String,
      enum: Object.values(<%= EnumType %>),
    }<% if (isArray) {-%>] <% }-%>
    ,
<% } else { -%>
    <%= property %>:<% if (isArray) {-%> [ <% }-%> {
       <% if (kind === 'object') { -%>
      // <creating-property-object-<%= property %> />
      <% }-%>
       <% if (kind === 'primitive') { -%>
      <% if (type === 'string') { -%>
      type: String,
      <% if (isText) { -%>
       index: 'text',
      <% } -%>

      <% } else if (type === 'number') { -%>
      type: Number,
    <% } else if (type === 'boolean') { -%>
      type: Boolean,
    <% } else if (type === 'date') { -%>
          type: Date,
    <% } -%>
   <% }-%>
    }
    <% if (isArray) {-%>] <% }-%>
    ,
<% } -%>