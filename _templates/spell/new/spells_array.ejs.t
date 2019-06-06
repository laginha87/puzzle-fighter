---
to: src/logic/spells/index.ts
inject: true
after: const index = \[
---
    <%=h.changeCase.pascal(name)%>,