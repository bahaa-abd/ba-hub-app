---
inject: true
to: ./src/swagger/routes/<%=  nameDash %>.swagger.ts
after: // property
---
<% if (kind === 'reference' ) { -%>
<% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
<%= property %>Id
<% } -%>
<% if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids
<% } -%>
<% } else{-%><%= property %><% }-%>: { type: <% if ( isArray) {-%>
'array',items: {type:<% } -%>
<% if (kind === 'local')  {-%> 
    'object',properties: {
    ar: { type: 'string'},
    en: { type: 'string'}
} 
<% } else if (kind === 'primitive') { -%>'<%= type %>',<% 
}else if (kind !== 'object'){-%>'string',<% } -%>
<% if (kind === 'enum') 
{-%> enum: [<% enumValue.split(" ").forEach(element => {-%>'<%= element %>',<% }) -%>]  <% } -%>
<% if ( isArray && kind !== 'object') { -%>} <% } -%>
<% if (kind !== 'object') {  -%>},<% }  -%>
<% if (kind === 'object') {  -%>
'object',properties: {
//  properties <%= property %>
}   
<% if ( isArray) { -%> } <% } -%> },<% }  -%>