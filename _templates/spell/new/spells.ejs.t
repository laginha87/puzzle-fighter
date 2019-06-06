---
to: src/logic/spells/index.ts
inject: true
before: \nconst index = \[
---
export { <%=h.changeCase.pascal(name)%> } from 'src/logic/spells/<%=h.changeCase.pascal(name)%>';
import { <%=h.changeCase.pascal(name)%> } from 'src/logic/spells/<%=h.changeCase.pascal(name)%>';