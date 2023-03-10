import supertest, {Response} from "supertest"
import {refreshDatabase} from "../concerns"

const req = supertest.agent("http://localhost:3000/api")
afterAll(() => refreshDatabase())
beforeEach(() => refreshDatabase())

test('can store comment', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
            "image": "data:@file/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIGlkPSJlOTM5ZDA4Ni02MzhmLTQ5OTYtODdmYy1jOGY4ZTJlNzZlZDgiCiAgIGRhdGEtbmFtZT0iTGF5ZXIgMSIKICAgd2lkdGg9Ijg4Ny44MiIKICAgaGVpZ2h0PSI2MjUuMzYiCiAgIHZpZXdCb3g9IjAgMCA4ODcuODIgNjI1LjM2IgogICB2ZXJzaW9uPSIxLjEiCiAgIHNvZGlwb2RpOmRvY25hbWU9InVuZHJhd19waG90b180eWI5LnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45Mi4zICgyNDA1NTQ2LCAyMDE4LTAzLTExKSI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMzUiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM2NiIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3MTMiCiAgICAgaWQ9Im5hbWVkdmlldzMzIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjQ1MDc5MjMyIgogICAgIGlua3NjYXBlOmN4PSI0NDMuOTEiCiAgICAgaW5rc2NhcGU6Y3k9IjMxMi42Nzk5OSIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMjYiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJlOTM5ZDA4Ni02MzhmLTQ5OTYtODdmYy1jOGY4ZTJlNzZlZDgiIC8+CiAgPGRlZnMKICAgICBpZD0iZGVmczEzIj4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9IjU0NTU5NTE0LWY4YmYtNGI3Mi04YjEzLTQwMzdlZmQwNTc4ZSIKICAgICAgIHgxPSI2MDAiCiAgICAgICB5MT0iNzU0LjAyIgogICAgICAgeDI9IjYwMCIKICAgICAgIHkyPSIxNDUuOTgiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjI1IgogICAgICAgICBpZD0ic3RvcDIiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMC41NCIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjEyIgogICAgICAgICBpZD0ic3RvcDQiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjEiCiAgICAgICAgIGlkPSJzdG9wNiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlkPSJlNjQ1NTQ5MC1hOTJlLTQ0OTItOWY1OC1hZjJjZjMwNDc1MWEiCiAgICAgICB4MT0iNDM3LjI1IgogICAgICAgeTE9IjU3NC41MSIKICAgICAgIHgyPSI0MzcuMjUiCiAgICAgICB5Mj0iMzYuNjIiCiAgICAgICB4bGluazpocmVmPSIjNTQ1NTk1MTQtZjhiZi00YjcyLThiMTMtNDAzN2VmZDA1NzhlIiAvPgogICAgPGNsaXBQYXRoCiAgICAgICBpZD0iYjYyN2FjMGUtYTI1ZS00ZTY3LWJhMTAtZTQxNTYzOTk2MDJhIgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2My40NiAtMTQ1Ljk4KSI+CiAgICAgIDxyZWN0CiAgICAgICAgIHg9IjIxNi42NSIKICAgICAgICAgeT0iMTk0Ljk4IgogICAgICAgICB3aWR0aD0iNzY3LjMxIgogICAgICAgICBoZWlnaHQ9IjUxMC4zNiIKICAgICAgICAgcng9IjguODUiCiAgICAgICAgIHJ5PSI4Ljg1IgogICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgICBpZD0icmVjdDEwIiAvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+CiAgPHRpdGxlCiAgICAgaWQ9InRpdGxlMTUiPnBob3RvPC90aXRsZT4KICA8cGF0aAogICAgIGQ9Ik0xMDM2LDczNC44NkExOS4wNiwxOS4wNiwwLDAsMSwxMDE3LDc1NEgxODNhMTkuMDYsMTkuMDYsMCwwLDEtMTktMTkuMTZWMTY1LjE0QTE5LjA2LDE5LjA2LDAsMCwxLDE4MywxNDZIMTAxN2ExOS4wNiwxOS4wNiwwLDAsMSwxOSwxOS4xNiIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTYzLjQ2IC0xNDUuOTgpIgogICAgIGZpbGw9InVybCgjNTQ1NTk1MTQtZjhiZi00YjcyLThiMTMtNDAzN2VmZDA1NzhlKSIKICAgICBpZD0icGF0aDE3IiAvPgogIDxwYXRoCiAgICAgZD0iTTEwMjYuMTksNzI1LjU0YTE4LjUyLDE4LjUyLDAsMCwxLTE4LjUyLDE4LjUySDE5Mi45M2ExOC41MiwxOC41MiwwLDAsMS0xOC41Mi0xOC41MlYxNzQuNzhhMTguNTIsMTguNTIsMCwwLDEsMTguNTItMTguNTJoODE0Ljc0YTE4LjUyLDE4LjUyLDAsMCwxLDE4LjUyLDE4LjUyIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjMuNDYgLTE0NS45OCkiCiAgICAgZmlsbD0iI2ZmZiIKICAgICBpZD0icGF0aDE5IgogICAgIHN0eWxlPSJmaWxsOiNjY2NjY2MiIC8+CiAgPGcKICAgICBpZD0iNWY3ZjRmYmEtMWRmNC00YzliLWFiNmYtM2Y2NjgxMGNiNjZlIgogICAgIGRhdGEtbmFtZT0iJmx0O1JlY3RhbmdsZSZndDsiPgogICAgPHJlY3QKICAgICAgIHg9IjQzLjQ5IgogICAgICAgeT0iMzYuNjIiCiAgICAgICB3aWR0aD0iNzg3LjUyIgogICAgICAgaGVpZ2h0PSI1MzcuODkiCiAgICAgICByeD0iOC44NSIKICAgICAgIHJ5PSI4Ljg1IgogICAgICAgZmlsbD0idXJsKCNlNjQ1NTQ5MC1hOTJlLTQ0OTItOWY1OC1hZjJjZjMwNDc1MWEpIgogICAgICAgaWQ9InJlY3QyMSIgLz4KICA8L2c+CiAgPHJlY3QKICAgICB4PSI1My4xOSIKICAgICB5PSI0OSIKICAgICB3aWR0aD0iNzY3LjMxIgogICAgIGhlaWdodD0iNTEwLjM2IgogICAgIHJ4PSI4Ljg1IgogICAgIHJ5PSI4Ljg1IgogICAgIGZpbGw9IiNmZmYiCiAgICAgaWQ9InJlY3QyNCIgLz4KICA8ZwogICAgIGNsaXAtcGF0aD0idXJsKCNiNjI3YWMwZS1hMjVlLTRlNjctYmExMC1lNDE1NjM5OTYwMmEpIgogICAgIGlkPSJnMjgiCiAgICAgc3R5bGU9ImZpbGw6IzI4MzEzOTtmaWxsLW9wYWNpdHk6MC45ODQzMTM3MyI+CiAgICA8cGF0aAogICAgICAgZD0iTTE3NCw3MDAuNjYsMzg4LjIxLDQ1NS4xOWE0Mi42NCw0Mi42NCwwLDAsMSw2MC4zNC0zLjk0bDYwLDUyLjkzYTQyLjY0LDQyLjY0LDAsMCwwLDU1LjY1LjY3TDc0Ny41MiwzNTAuNzNhNDIuNjQsNDIuNjQsMCwwLDEsNTksNGwyMjUsMjQ3LjY0YTQyLjY0LDQyLjY0LDAsMCwxLDEwLjkxLDI0LjlsOC42OCw5Ny42OWE0Mi42NCw0Mi42NCwwLDAsMS00Mi40OCw0Ni40MkgyMDYuMTFBNDIuNjQsNDIuNjQsMCwwLDEsMTYzLjQ4LDczMGgwQTQyLjY0LDQyLjY0LDAsMCwxLDE3NCw3MDAuNjZaIgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2My40NiAtMTQ1Ljk4KSIKICAgICAgIGZpbGw9IiM2YzYzZmYiCiAgICAgICBpZD0icGF0aDI2IgogICAgICAgc3R5bGU9ImZpbGw6IzI4MzEzOTtmaWxsLW9wYWNpdHk6MC45ODQzMTM3MyIgLz4KICA8L2c+CiAgPGNpcmNsZQogICAgIGN4PSIxNDUuNTgiCiAgICAgY3k9IjEzMC44MyIKICAgICByPSI0Ny41MiIKICAgICBmaWxsPSIjZmY1MjUyIgogICAgIGlkPSJjaXJjbGUzMCIKICAgICBzdHlsZT0iZmlsbDojZjA0ZDAwO2ZpbGwtb3BhY2l0eToxIiAvPgo8L3N2Zz4K"
        })

    await req.get('/posts')
        .then(async (res: Response) => {
            await req.post('/comments')
                .set({Authorization: 'Bearer ' + authRes.body.token})
                .send({
                    "postId": res.body[0].id,
                    "email": "jeanne@doe.com",
                    "message": "Ultrices tincidunt arcu non sodales neque sodales",
                })
                .expect(200)
                .then((res: Response) => expect(res.body.status).toBe("success"))
        })
})

test('can update comment', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
            "image": "data:@file/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIGlkPSJlOTM5ZDA4Ni02MzhmLTQ5OTYtODdmYy1jOGY4ZTJlNzZlZDgiCiAgIGRhdGEtbmFtZT0iTGF5ZXIgMSIKICAgd2lkdGg9Ijg4Ny44MiIKICAgaGVpZ2h0PSI2MjUuMzYiCiAgIHZpZXdCb3g9IjAgMCA4ODcuODIgNjI1LjM2IgogICB2ZXJzaW9uPSIxLjEiCiAgIHNvZGlwb2RpOmRvY25hbWU9InVuZHJhd19waG90b180eWI5LnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45Mi4zICgyNDA1NTQ2LCAyMDE4LTAzLTExKSI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMzUiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM2NiIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3MTMiCiAgICAgaWQ9Im5hbWVkdmlldzMzIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjQ1MDc5MjMyIgogICAgIGlua3NjYXBlOmN4PSI0NDMuOTEiCiAgICAgaW5rc2NhcGU6Y3k9IjMxMi42Nzk5OSIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMjYiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJlOTM5ZDA4Ni02MzhmLTQ5OTYtODdmYy1jOGY4ZTJlNzZlZDgiIC8+CiAgPGRlZnMKICAgICBpZD0iZGVmczEzIj4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9IjU0NTU5NTE0LWY4YmYtNGI3Mi04YjEzLTQwMzdlZmQwNTc4ZSIKICAgICAgIHgxPSI2MDAiCiAgICAgICB5MT0iNzU0LjAyIgogICAgICAgeDI9IjYwMCIKICAgICAgIHkyPSIxNDUuOTgiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjI1IgogICAgICAgICBpZD0ic3RvcDIiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMC41NCIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjEyIgogICAgICAgICBpZD0ic3RvcDQiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjEiCiAgICAgICAgIGlkPSJzdG9wNiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlkPSJlNjQ1NTQ5MC1hOTJlLTQ0OTItOWY1OC1hZjJjZjMwNDc1MWEiCiAgICAgICB4MT0iNDM3LjI1IgogICAgICAgeTE9IjU3NC41MSIKICAgICAgIHgyPSI0MzcuMjUiCiAgICAgICB5Mj0iMzYuNjIiCiAgICAgICB4bGluazpocmVmPSIjNTQ1NTk1MTQtZjhiZi00YjcyLThiMTMtNDAzN2VmZDA1NzhlIiAvPgogICAgPGNsaXBQYXRoCiAgICAgICBpZD0iYjYyN2FjMGUtYTI1ZS00ZTY3LWJhMTAtZTQxNTYzOTk2MDJhIgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2My40NiAtMTQ1Ljk4KSI+CiAgICAgIDxyZWN0CiAgICAgICAgIHg9IjIxNi42NSIKICAgICAgICAgeT0iMTk0Ljk4IgogICAgICAgICB3aWR0aD0iNzY3LjMxIgogICAgICAgICBoZWlnaHQ9IjUxMC4zNiIKICAgICAgICAgcng9IjguODUiCiAgICAgICAgIHJ5PSI4Ljg1IgogICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgICBpZD0icmVjdDEwIiAvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+CiAgPHRpdGxlCiAgICAgaWQ9InRpdGxlMTUiPnBob3RvPC90aXRsZT4KICA8cGF0aAogICAgIGQ9Ik0xMDM2LDczNC44NkExOS4wNiwxOS4wNiwwLDAsMSwxMDE3LDc1NEgxODNhMTkuMDYsMTkuMDYsMCwwLDEtMTktMTkuMTZWMTY1LjE0QTE5LjA2LDE5LjA2LDAsMCwxLDE4MywxNDZIMTAxN2ExOS4wNiwxOS4wNiwwLDAsMSwxOSwxOS4xNiIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTYzLjQ2IC0xNDUuOTgpIgogICAgIGZpbGw9InVybCgjNTQ1NTk1MTQtZjhiZi00YjcyLThiMTMtNDAzN2VmZDA1NzhlKSIKICAgICBpZD0icGF0aDE3IiAvPgogIDxwYXRoCiAgICAgZD0iTTEwMjYuMTksNzI1LjU0YTE4LjUyLDE4LjUyLDAsMCwxLTE4LjUyLDE4LjUySDE5Mi45M2ExOC41MiwxOC41MiwwLDAsMS0xOC41Mi0xOC41MlYxNzQuNzhhMTguNTIsMTguNTIsMCwwLDEsMTguNTItMTguNTJoODE0Ljc0YTE4LjUyLDE4LjUyLDAsMCwxLDE4LjUyLDE4LjUyIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjMuNDYgLTE0NS45OCkiCiAgICAgZmlsbD0iI2ZmZiIKICAgICBpZD0icGF0aDE5IgogICAgIHN0eWxlPSJmaWxsOiNjY2NjY2MiIC8+CiAgPGcKICAgICBpZD0iNWY3ZjRmYmEtMWRmNC00YzliLWFiNmYtM2Y2NjgxMGNiNjZlIgogICAgIGRhdGEtbmFtZT0iJmx0O1JlY3RhbmdsZSZndDsiPgogICAgPHJlY3QKICAgICAgIHg9IjQzLjQ5IgogICAgICAgeT0iMzYuNjIiCiAgICAgICB3aWR0aD0iNzg3LjUyIgogICAgICAgaGVpZ2h0PSI1MzcuODkiCiAgICAgICByeD0iOC44NSIKICAgICAgIHJ5PSI4Ljg1IgogICAgICAgZmlsbD0idXJsKCNlNjQ1NTQ5MC1hOTJlLTQ0OTItOWY1OC1hZjJjZjMwNDc1MWEpIgogICAgICAgaWQ9InJlY3QyMSIgLz4KICA8L2c+CiAgPHJlY3QKICAgICB4PSI1My4xOSIKICAgICB5PSI0OSIKICAgICB3aWR0aD0iNzY3LjMxIgogICAgIGhlaWdodD0iNTEwLjM2IgogICAgIHJ4PSI4Ljg1IgogICAgIHJ5PSI4Ljg1IgogICAgIGZpbGw9IiNmZmYiCiAgICAgaWQ9InJlY3QyNCIgLz4KICA8ZwogICAgIGNsaXAtcGF0aD0idXJsKCNiNjI3YWMwZS1hMjVlLTRlNjctYmExMC1lNDE1NjM5OTYwMmEpIgogICAgIGlkPSJnMjgiCiAgICAgc3R5bGU9ImZpbGw6IzI4MzEzOTtmaWxsLW9wYWNpdHk6MC45ODQzMTM3MyI+CiAgICA8cGF0aAogICAgICAgZD0iTTE3NCw3MDAuNjYsMzg4LjIxLDQ1NS4xOWE0Mi42NCw0Mi42NCwwLDAsMSw2MC4zNC0zLjk0bDYwLDUyLjkzYTQyLjY0LDQyLjY0LDAsMCwwLDU1LjY1LjY3TDc0Ny41MiwzNTAuNzNhNDIuNjQsNDIuNjQsMCwwLDEsNTksNGwyMjUsMjQ3LjY0YTQyLjY0LDQyLjY0LDAsMCwxLDEwLjkxLDI0LjlsOC42OCw5Ny42OWE0Mi42NCw0Mi42NCwwLDAsMS00Mi40OCw0Ni40MkgyMDYuMTFBNDIuNjQsNDIuNjQsMCwwLDEsMTYzLjQ4LDczMGgwQTQyLjY0LDQyLjY0LDAsMCwxLDE3NCw3MDAuNjZaIgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2My40NiAtMTQ1Ljk4KSIKICAgICAgIGZpbGw9IiM2YzYzZmYiCiAgICAgICBpZD0icGF0aDI2IgogICAgICAgc3R5bGU9ImZpbGw6IzI4MzEzOTtmaWxsLW9wYWNpdHk6MC45ODQzMTM3MyIgLz4KICA8L2c+CiAgPGNpcmNsZQogICAgIGN4PSIxNDUuNTgiCiAgICAgY3k9IjEzMC44MyIKICAgICByPSI0Ny41MiIKICAgICBmaWxsPSIjZmY1MjUyIgogICAgIGlkPSJjaXJjbGUzMCIKICAgICBzdHlsZT0iZmlsbDojZjA0ZDAwO2ZpbGwtb3BhY2l0eToxIiAvPgo8L3N2Zz4K"
        })

    const postRes: Response = await req.get('/posts')

    await req.post('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "postId": postRes.body[0].id,
            "email": "jeanne@doe.com",
            "message": "Ultrices tincidunt arcu non sodales neque sodales",
        })

    await req.get('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .then(async (res: Response) => {
            await req.put('/comments/' + res.body[0].id)
                .set({Authorization: 'Bearer ' + authRes.body.token})
                .send({"message": "Lorem ipsum dolor sit amet"})
                .expect(200)
                .then((res: Response) => expect(res.body.status).toBe("success"))
        })
})

test('can get comments collection', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
            "image": "data:@file/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIGlkPSJlOTM5ZDA4Ni02MzhmLTQ5OTYtODdmYy1jOGY4ZTJlNzZlZDgiCiAgIGRhdGEtbmFtZT0iTGF5ZXIgMSIKICAgd2lkdGg9Ijg4Ny44MiIKICAgaGVpZ2h0PSI2MjUuMzYiCiAgIHZpZXdCb3g9IjAgMCA4ODcuODIgNjI1LjM2IgogICB2ZXJzaW9uPSIxLjEiCiAgIHNvZGlwb2RpOmRvY25hbWU9InVuZHJhd19waG90b180eWI5LnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45Mi4zICgyNDA1NTQ2LCAyMDE4LTAzLTExKSI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMzUiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM2NiIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3MTMiCiAgICAgaWQ9Im5hbWVkdmlldzMzIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjQ1MDc5MjMyIgogICAgIGlua3NjYXBlOmN4PSI0NDMuOTEiCiAgICAgaW5rc2NhcGU6Y3k9IjMxMi42Nzk5OSIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMjYiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJlOTM5ZDA4Ni02MzhmLTQ5OTYtODdmYy1jOGY4ZTJlNzZlZDgiIC8+CiAgPGRlZnMKICAgICBpZD0iZGVmczEzIj4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9IjU0NTU5NTE0LWY4YmYtNGI3Mi04YjEzLTQwMzdlZmQwNTc4ZSIKICAgICAgIHgxPSI2MDAiCiAgICAgICB5MT0iNzU0LjAyIgogICAgICAgeDI9IjYwMCIKICAgICAgIHkyPSIxNDUuOTgiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjI1IgogICAgICAgICBpZD0ic3RvcDIiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMC41NCIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjEyIgogICAgICAgICBpZD0ic3RvcDQiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjEiCiAgICAgICAgIGlkPSJzdG9wNiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlkPSJlNjQ1NTQ5MC1hOTJlLTQ0OTItOWY1OC1hZjJjZjMwNDc1MWEiCiAgICAgICB4MT0iNDM3LjI1IgogICAgICAgeTE9IjU3NC41MSIKICAgICAgIHgyPSI0MzcuMjUiCiAgICAgICB5Mj0iMzYuNjIiCiAgICAgICB4bGluazpocmVmPSIjNTQ1NTk1MTQtZjhiZi00YjcyLThiMTMtNDAzN2VmZDA1NzhlIiAvPgogICAgPGNsaXBQYXRoCiAgICAgICBpZD0iYjYyN2FjMGUtYTI1ZS00ZTY3LWJhMTAtZTQxNTYzOTk2MDJhIgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2My40NiAtMTQ1Ljk4KSI+CiAgICAgIDxyZWN0CiAgICAgICAgIHg9IjIxNi42NSIKICAgICAgICAgeT0iMTk0Ljk4IgogICAgICAgICB3aWR0aD0iNzY3LjMxIgogICAgICAgICBoZWlnaHQ9IjUxMC4zNiIKICAgICAgICAgcng9IjguODUiCiAgICAgICAgIHJ5PSI4Ljg1IgogICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgICBpZD0icmVjdDEwIiAvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+CiAgPHRpdGxlCiAgICAgaWQ9InRpdGxlMTUiPnBob3RvPC90aXRsZT4KICA8cGF0aAogICAgIGQ9Ik0xMDM2LDczNC44NkExOS4wNiwxOS4wNiwwLDAsMSwxMDE3LDc1NEgxODNhMTkuMDYsMTkuMDYsMCwwLDEtMTktMTkuMTZWMTY1LjE0QTE5LjA2LDE5LjA2LDAsMCwxLDE4MywxNDZIMTAxN2ExOS4wNiwxOS4wNiwwLDAsMSwxOSwxOS4xNiIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTYzLjQ2IC0xNDUuOTgpIgogICAgIGZpbGw9InVybCgjNTQ1NTk1MTQtZjhiZi00YjcyLThiMTMtNDAzN2VmZDA1NzhlKSIKICAgICBpZD0icGF0aDE3IiAvPgogIDxwYXRoCiAgICAgZD0iTTEwMjYuMTksNzI1LjU0YTE4LjUyLDE4LjUyLDAsMCwxLTE4LjUyLDE4LjUySDE5Mi45M2ExOC41MiwxOC41MiwwLDAsMS0xOC41Mi0xOC41MlYxNzQuNzhhMTguNTIsMTguNTIsMCwwLDEsMTguNTItMTguNTJoODE0Ljc0YTE4LjUyLDE4LjUyLDAsMCwxLDE4LjUyLDE4LjUyIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjMuNDYgLTE0NS45OCkiCiAgICAgZmlsbD0iI2ZmZiIKICAgICBpZD0icGF0aDE5IgogICAgIHN0eWxlPSJmaWxsOiNjY2NjY2MiIC8+CiAgPGcKICAgICBpZD0iNWY3ZjRmYmEtMWRmNC00YzliLWFiNmYtM2Y2NjgxMGNiNjZlIgogICAgIGRhdGEtbmFtZT0iJmx0O1JlY3RhbmdsZSZndDsiPgogICAgPHJlY3QKICAgICAgIHg9IjQzLjQ5IgogICAgICAgeT0iMzYuNjIiCiAgICAgICB3aWR0aD0iNzg3LjUyIgogICAgICAgaGVpZ2h0PSI1MzcuODkiCiAgICAgICByeD0iOC44NSIKICAgICAgIHJ5PSI4Ljg1IgogICAgICAgZmlsbD0idXJsKCNlNjQ1NTQ5MC1hOTJlLTQ0OTItOWY1OC1hZjJjZjMwNDc1MWEpIgogICAgICAgaWQ9InJlY3QyMSIgLz4KICA8L2c+CiAgPHJlY3QKICAgICB4PSI1My4xOSIKICAgICB5PSI0OSIKICAgICB3aWR0aD0iNzY3LjMxIgogICAgIGhlaWdodD0iNTEwLjM2IgogICAgIHJ4PSI4Ljg1IgogICAgIHJ5PSI4Ljg1IgogICAgIGZpbGw9IiNmZmYiCiAgICAgaWQ9InJlY3QyNCIgLz4KICA8ZwogICAgIGNsaXAtcGF0aD0idXJsKCNiNjI3YWMwZS1hMjVlLTRlNjctYmExMC1lNDE1NjM5OTYwMmEpIgogICAgIGlkPSJnMjgiCiAgICAgc3R5bGU9ImZpbGw6IzI4MzEzOTtmaWxsLW9wYWNpdHk6MC45ODQzMTM3MyI+CiAgICA8cGF0aAogICAgICAgZD0iTTE3NCw3MDAuNjYsMzg4LjIxLDQ1NS4xOWE0Mi42NCw0Mi42NCwwLDAsMSw2MC4zNC0zLjk0bDYwLDUyLjkzYTQyLjY0LDQyLjY0LDAsMCwwLDU1LjY1LjY3TDc0Ny41MiwzNTAuNzNhNDIuNjQsNDIuNjQsMCwwLDEsNTksNGwyMjUsMjQ3LjY0YTQyLjY0LDQyLjY0LDAsMCwxLDEwLjkxLDI0LjlsOC42OCw5Ny42OWE0Mi42NCw0Mi42NCwwLDAsMS00Mi40OCw0Ni40MkgyMDYuMTFBNDIuNjQsNDIuNjQsMCwwLDEsMTYzLjQ4LDczMGgwQTQyLjY0LDQyLjY0LDAsMCwxLDE3NCw3MDAuNjZaIgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2My40NiAtMTQ1Ljk4KSIKICAgICAgIGZpbGw9IiM2YzYzZmYiCiAgICAgICBpZD0icGF0aDI2IgogICAgICAgc3R5bGU9ImZpbGw6IzI4MzEzOTtmaWxsLW9wYWNpdHk6MC45ODQzMTM3MyIgLz4KICA8L2c+CiAgPGNpcmNsZQogICAgIGN4PSIxNDUuNTgiCiAgICAgY3k9IjEzMC44MyIKICAgICByPSI0Ny41MiIKICAgICBmaWxsPSIjZmY1MjUyIgogICAgIGlkPSJjaXJjbGUzMCIKICAgICBzdHlsZT0iZmlsbDojZjA0ZDAwO2ZpbGwtb3BhY2l0eToxIiAvPgo8L3N2Zz4K"
        })

    const postRes: Response = await req.get('/posts')

    await req.post('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "postId": postRes.body[0].id,
            "email": "jeanne@doe.com",
            "message": "Ultrices tincidunt arcu non sodales neque sodales",
        })

    await req.get('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .expect(200)
        .then((res: Response) => {
            expect(res.body.length).toEqual(1)
            expect(res.body[0].id).toBeDefined()
            expect(res.body[0].publishedAt).toBeDefined()
            expect(res.body[0].postId).toBe(postRes.body[0].id)
            expect(res.body[0].email).toBe("jeanne@doe.com")
            expect(res.body[0].message).toBe("Ultrices tincidunt arcu non sodales neque sodales")
        })
})

test('can get comment item', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
            "image": "data:@file/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIGlkPSJlOTM5ZDA4Ni02MzhmLTQ5OTYtODdmYy1jOGY4ZTJlNzZlZDgiCiAgIGRhdGEtbmFtZT0iTGF5ZXIgMSIKICAgd2lkdGg9Ijg4Ny44MiIKICAgaGVpZ2h0PSI2MjUuMzYiCiAgIHZpZXdCb3g9IjAgMCA4ODcuODIgNjI1LjM2IgogICB2ZXJzaW9uPSIxLjEiCiAgIHNvZGlwb2RpOmRvY25hbWU9InVuZHJhd19waG90b180eWI5LnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45Mi4zICgyNDA1NTQ2LCAyMDE4LTAzLTExKSI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMzUiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM2NiIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3MTMiCiAgICAgaWQ9Im5hbWVkdmlldzMzIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjQ1MDc5MjMyIgogICAgIGlua3NjYXBlOmN4PSI0NDMuOTEiCiAgICAgaW5rc2NhcGU6Y3k9IjMxMi42Nzk5OSIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMjYiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJlOTM5ZDA4Ni02MzhmLTQ5OTYtODdmYy1jOGY4ZTJlNzZlZDgiIC8+CiAgPGRlZnMKICAgICBpZD0iZGVmczEzIj4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9IjU0NTU5NTE0LWY4YmYtNGI3Mi04YjEzLTQwMzdlZmQwNTc4ZSIKICAgICAgIHgxPSI2MDAiCiAgICAgICB5MT0iNzU0LjAyIgogICAgICAgeDI9IjYwMCIKICAgICAgIHkyPSIxNDUuOTgiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjI1IgogICAgICAgICBpZD0ic3RvcDIiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMC41NCIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjEyIgogICAgICAgICBpZD0ic3RvcDQiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjEiCiAgICAgICAgIGlkPSJzdG9wNiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlkPSJlNjQ1NTQ5MC1hOTJlLTQ0OTItOWY1OC1hZjJjZjMwNDc1MWEiCiAgICAgICB4MT0iNDM3LjI1IgogICAgICAgeTE9IjU3NC41MSIKICAgICAgIHgyPSI0MzcuMjUiCiAgICAgICB5Mj0iMzYuNjIiCiAgICAgICB4bGluazpocmVmPSIjNTQ1NTk1MTQtZjhiZi00YjcyLThiMTMtNDAzN2VmZDA1NzhlIiAvPgogICAgPGNsaXBQYXRoCiAgICAgICBpZD0iYjYyN2FjMGUtYTI1ZS00ZTY3LWJhMTAtZTQxNTYzOTk2MDJhIgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2My40NiAtMTQ1Ljk4KSI+CiAgICAgIDxyZWN0CiAgICAgICAgIHg9IjIxNi42NSIKICAgICAgICAgeT0iMTk0Ljk4IgogICAgICAgICB3aWR0aD0iNzY3LjMxIgogICAgICAgICBoZWlnaHQ9IjUxMC4zNiIKICAgICAgICAgcng9IjguODUiCiAgICAgICAgIHJ5PSI4Ljg1IgogICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgICBpZD0icmVjdDEwIiAvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+CiAgPHRpdGxlCiAgICAgaWQ9InRpdGxlMTUiPnBob3RvPC90aXRsZT4KICA8cGF0aAogICAgIGQ9Ik0xMDM2LDczNC44NkExOS4wNiwxOS4wNiwwLDAsMSwxMDE3LDc1NEgxODNhMTkuMDYsMTkuMDYsMCwwLDEtMTktMTkuMTZWMTY1LjE0QTE5LjA2LDE5LjA2LDAsMCwxLDE4MywxNDZIMTAxN2ExOS4wNiwxOS4wNiwwLDAsMSwxOSwxOS4xNiIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTYzLjQ2IC0xNDUuOTgpIgogICAgIGZpbGw9InVybCgjNTQ1NTk1MTQtZjhiZi00YjcyLThiMTMtNDAzN2VmZDA1NzhlKSIKICAgICBpZD0icGF0aDE3IiAvPgogIDxwYXRoCiAgICAgZD0iTTEwMjYuMTksNzI1LjU0YTE4LjUyLDE4LjUyLDAsMCwxLTE4LjUyLDE4LjUySDE5Mi45M2ExOC41MiwxOC41MiwwLDAsMS0xOC41Mi0xOC41MlYxNzQuNzhhMTguNTIsMTguNTIsMCwwLDEsMTguNTItMTguNTJoODE0Ljc0YTE4LjUyLDE4LjUyLDAsMCwxLDE4LjUyLDE4LjUyIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjMuNDYgLTE0NS45OCkiCiAgICAgZmlsbD0iI2ZmZiIKICAgICBpZD0icGF0aDE5IgogICAgIHN0eWxlPSJmaWxsOiNjY2NjY2MiIC8+CiAgPGcKICAgICBpZD0iNWY3ZjRmYmEtMWRmNC00YzliLWFiNmYtM2Y2NjgxMGNiNjZlIgogICAgIGRhdGEtbmFtZT0iJmx0O1JlY3RhbmdsZSZndDsiPgogICAgPHJlY3QKICAgICAgIHg9IjQzLjQ5IgogICAgICAgeT0iMzYuNjIiCiAgICAgICB3aWR0aD0iNzg3LjUyIgogICAgICAgaGVpZ2h0PSI1MzcuODkiCiAgICAgICByeD0iOC44NSIKICAgICAgIHJ5PSI4Ljg1IgogICAgICAgZmlsbD0idXJsKCNlNjQ1NTQ5MC1hOTJlLTQ0OTItOWY1OC1hZjJjZjMwNDc1MWEpIgogICAgICAgaWQ9InJlY3QyMSIgLz4KICA8L2c+CiAgPHJlY3QKICAgICB4PSI1My4xOSIKICAgICB5PSI0OSIKICAgICB3aWR0aD0iNzY3LjMxIgogICAgIGhlaWdodD0iNTEwLjM2IgogICAgIHJ4PSI4Ljg1IgogICAgIHJ5PSI4Ljg1IgogICAgIGZpbGw9IiNmZmYiCiAgICAgaWQ9InJlY3QyNCIgLz4KICA8ZwogICAgIGNsaXAtcGF0aD0idXJsKCNiNjI3YWMwZS1hMjVlLTRlNjctYmExMC1lNDE1NjM5OTYwMmEpIgogICAgIGlkPSJnMjgiCiAgICAgc3R5bGU9ImZpbGw6IzI4MzEzOTtmaWxsLW9wYWNpdHk6MC45ODQzMTM3MyI+CiAgICA8cGF0aAogICAgICAgZD0iTTE3NCw3MDAuNjYsMzg4LjIxLDQ1NS4xOWE0Mi42NCw0Mi42NCwwLDAsMSw2MC4zNC0zLjk0bDYwLDUyLjkzYTQyLjY0LDQyLjY0LDAsMCwwLDU1LjY1LjY3TDc0Ny41MiwzNTAuNzNhNDIuNjQsNDIuNjQsMCwwLDEsNTksNGwyMjUsMjQ3LjY0YTQyLjY0LDQyLjY0LDAsMCwxLDEwLjkxLDI0LjlsOC42OCw5Ny42OWE0Mi42NCw0Mi42NCwwLDAsMS00Mi40OCw0Ni40MkgyMDYuMTFBNDIuNjQsNDIuNjQsMCwwLDEsMTYzLjQ4LDczMGgwQTQyLjY0LDQyLjY0LDAsMCwxLDE3NCw3MDAuNjZaIgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2My40NiAtMTQ1Ljk4KSIKICAgICAgIGZpbGw9IiM2YzYzZmYiCiAgICAgICBpZD0icGF0aDI2IgogICAgICAgc3R5bGU9ImZpbGw6IzI4MzEzOTtmaWxsLW9wYWNpdHk6MC45ODQzMTM3MyIgLz4KICA8L2c+CiAgPGNpcmNsZQogICAgIGN4PSIxNDUuNTgiCiAgICAgY3k9IjEzMC44MyIKICAgICByPSI0Ny41MiIKICAgICBmaWxsPSIjZmY1MjUyIgogICAgIGlkPSJjaXJjbGUzMCIKICAgICBzdHlsZT0iZmlsbDojZjA0ZDAwO2ZpbGwtb3BhY2l0eToxIiAvPgo8L3N2Zz4K"
        })

    const postRes: Response = await req.get('/posts')

    await req.post('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "postId": postRes.body[0].id,
            "email": "jeanne@doe.com",
            "message": "Ultrices tincidunt arcu non sodales neque sodales",
        })

    await req.get('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .then(async (res: Response) => {
            await req.get('/comments/' + res.body[0].id)
                .expect(200)
                .then((res: Response) => {
                    expect(res.body.id).toBeDefined()
                    expect(res.body.publishedAt).toBeDefined()
                    expect(res.body.postId).toBe(postRes.body[0].id)
                    expect(res.body.email).toBe("jeanne@doe.com")
                    expect(res.body.message).toBe("Ultrices tincidunt arcu non sodales neque sodales")
                })
        })
})

test('can delete comment', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
            "image": "data:@file/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIGlkPSJlOTM5ZDA4Ni02MzhmLTQ5OTYtODdmYy1jOGY4ZTJlNzZlZDgiCiAgIGRhdGEtbmFtZT0iTGF5ZXIgMSIKICAgd2lkdGg9Ijg4Ny44MiIKICAgaGVpZ2h0PSI2MjUuMzYiCiAgIHZpZXdCb3g9IjAgMCA4ODcuODIgNjI1LjM2IgogICB2ZXJzaW9uPSIxLjEiCiAgIHNvZGlwb2RpOmRvY25hbWU9InVuZHJhd19waG90b180eWI5LnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45Mi4zICgyNDA1NTQ2LCAyMDE4LTAzLTExKSI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMzUiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM2NiIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3MTMiCiAgICAgaWQ9Im5hbWVkdmlldzMzIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjQ1MDc5MjMyIgogICAgIGlua3NjYXBlOmN4PSI0NDMuOTEiCiAgICAgaW5rc2NhcGU6Y3k9IjMxMi42Nzk5OSIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMjYiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJlOTM5ZDA4Ni02MzhmLTQ5OTYtODdmYy1jOGY4ZTJlNzZlZDgiIC8+CiAgPGRlZnMKICAgICBpZD0iZGVmczEzIj4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9IjU0NTU5NTE0LWY4YmYtNGI3Mi04YjEzLTQwMzdlZmQwNTc4ZSIKICAgICAgIHgxPSI2MDAiCiAgICAgICB5MT0iNzU0LjAyIgogICAgICAgeDI9IjYwMCIKICAgICAgIHkyPSIxNDUuOTgiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjI1IgogICAgICAgICBpZD0ic3RvcDIiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMC41NCIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjEyIgogICAgICAgICBpZD0ic3RvcDQiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgc3RvcC1jb2xvcj0iZ3JheSIKICAgICAgICAgc3RvcC1vcGFjaXR5PSIwLjEiCiAgICAgICAgIGlkPSJzdG9wNiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlkPSJlNjQ1NTQ5MC1hOTJlLTQ0OTItOWY1OC1hZjJjZjMwNDc1MWEiCiAgICAgICB4MT0iNDM3LjI1IgogICAgICAgeTE9IjU3NC41MSIKICAgICAgIHgyPSI0MzcuMjUiCiAgICAgICB5Mj0iMzYuNjIiCiAgICAgICB4bGluazpocmVmPSIjNTQ1NTk1MTQtZjhiZi00YjcyLThiMTMtNDAzN2VmZDA1NzhlIiAvPgogICAgPGNsaXBQYXRoCiAgICAgICBpZD0iYjYyN2FjMGUtYTI1ZS00ZTY3LWJhMTAtZTQxNTYzOTk2MDJhIgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2My40NiAtMTQ1Ljk4KSI+CiAgICAgIDxyZWN0CiAgICAgICAgIHg9IjIxNi42NSIKICAgICAgICAgeT0iMTk0Ljk4IgogICAgICAgICB3aWR0aD0iNzY3LjMxIgogICAgICAgICBoZWlnaHQ9IjUxMC4zNiIKICAgICAgICAgcng9IjguODUiCiAgICAgICAgIHJ5PSI4Ljg1IgogICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgICBpZD0icmVjdDEwIiAvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+CiAgPHRpdGxlCiAgICAgaWQ9InRpdGxlMTUiPnBob3RvPC90aXRsZT4KICA8cGF0aAogICAgIGQ9Ik0xMDM2LDczNC44NkExOS4wNiwxOS4wNiwwLDAsMSwxMDE3LDc1NEgxODNhMTkuMDYsMTkuMDYsMCwwLDEtMTktMTkuMTZWMTY1LjE0QTE5LjA2LDE5LjA2LDAsMCwxLDE4MywxNDZIMTAxN2ExOS4wNiwxOS4wNiwwLDAsMSwxOSwxOS4xNiIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTYzLjQ2IC0xNDUuOTgpIgogICAgIGZpbGw9InVybCgjNTQ1NTk1MTQtZjhiZi00YjcyLThiMTMtNDAzN2VmZDA1NzhlKSIKICAgICBpZD0icGF0aDE3IiAvPgogIDxwYXRoCiAgICAgZD0iTTEwMjYuMTksNzI1LjU0YTE4LjUyLDE4LjUyLDAsMCwxLTE4LjUyLDE4LjUySDE5Mi45M2ExOC41MiwxOC41MiwwLDAsMS0xOC41Mi0xOC41MlYxNzQuNzhhMTguNTIsMTguNTIsMCwwLDEsMTguNTItMTguNTJoODE0Ljc0YTE4LjUyLDE4LjUyLDAsMCwxLDE4LjUyLDE4LjUyIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjMuNDYgLTE0NS45OCkiCiAgICAgZmlsbD0iI2ZmZiIKICAgICBpZD0icGF0aDE5IgogICAgIHN0eWxlPSJmaWxsOiNjY2NjY2MiIC8+CiAgPGcKICAgICBpZD0iNWY3ZjRmYmEtMWRmNC00YzliLWFiNmYtM2Y2NjgxMGNiNjZlIgogICAgIGRhdGEtbmFtZT0iJmx0O1JlY3RhbmdsZSZndDsiPgogICAgPHJlY3QKICAgICAgIHg9IjQzLjQ5IgogICAgICAgeT0iMzYuNjIiCiAgICAgICB3aWR0aD0iNzg3LjUyIgogICAgICAgaGVpZ2h0PSI1MzcuODkiCiAgICAgICByeD0iOC44NSIKICAgICAgIHJ5PSI4Ljg1IgogICAgICAgZmlsbD0idXJsKCNlNjQ1NTQ5MC1hOTJlLTQ0OTItOWY1OC1hZjJjZjMwNDc1MWEpIgogICAgICAgaWQ9InJlY3QyMSIgLz4KICA8L2c+CiAgPHJlY3QKICAgICB4PSI1My4xOSIKICAgICB5PSI0OSIKICAgICB3aWR0aD0iNzY3LjMxIgogICAgIGhlaWdodD0iNTEwLjM2IgogICAgIHJ4PSI4Ljg1IgogICAgIHJ5PSI4Ljg1IgogICAgIGZpbGw9IiNmZmYiCiAgICAgaWQ9InJlY3QyNCIgLz4KICA8ZwogICAgIGNsaXAtcGF0aD0idXJsKCNiNjI3YWMwZS1hMjVlLTRlNjctYmExMC1lNDE1NjM5OTYwMmEpIgogICAgIGlkPSJnMjgiCiAgICAgc3R5bGU9ImZpbGw6IzI4MzEzOTtmaWxsLW9wYWNpdHk6MC45ODQzMTM3MyI+CiAgICA8cGF0aAogICAgICAgZD0iTTE3NCw3MDAuNjYsMzg4LjIxLDQ1NS4xOWE0Mi42NCw0Mi42NCwwLDAsMSw2MC4zNC0zLjk0bDYwLDUyLjkzYTQyLjY0LDQyLjY0LDAsMCwwLDU1LjY1LjY3TDc0Ny41MiwzNTAuNzNhNDIuNjQsNDIuNjQsMCwwLDEsNTksNGwyMjUsMjQ3LjY0YTQyLjY0LDQyLjY0LDAsMCwxLDEwLjkxLDI0LjlsOC42OCw5Ny42OWE0Mi42NCw0Mi42NCwwLDAsMS00Mi40OCw0Ni40MkgyMDYuMTFBNDIuNjQsNDIuNjQsMCwwLDEsMTYzLjQ4LDczMGgwQTQyLjY0LDQyLjY0LDAsMCwxLDE3NCw3MDAuNjZaIgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2My40NiAtMTQ1Ljk4KSIKICAgICAgIGZpbGw9IiM2YzYzZmYiCiAgICAgICBpZD0icGF0aDI2IgogICAgICAgc3R5bGU9ImZpbGw6IzI4MzEzOTtmaWxsLW9wYWNpdHk6MC45ODQzMTM3MyIgLz4KICA8L2c+CiAgPGNpcmNsZQogICAgIGN4PSIxNDUuNTgiCiAgICAgY3k9IjEzMC44MyIKICAgICByPSI0Ny41MiIKICAgICBmaWxsPSIjZmY1MjUyIgogICAgIGlkPSJjaXJjbGUzMCIKICAgICBzdHlsZT0iZmlsbDojZjA0ZDAwO2ZpbGwtb3BhY2l0eToxIiAvPgo8L3N2Zz4K"
        })

    const postRes: Response = await req.get('/posts')

    await req.post('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "postId": postRes.body[0].id,
            "email": "jeanne@doe.com",
            "message": "Ultrices tincidunt arcu non sodales neque sodales",
        })

    await req.get('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .then(async (res: Response) => {
            await req.delete('/comments/' + res.body[0].id)
                .set({Authorization: 'Bearer ' + authRes.body.token})
                .expect(200)
                .then((res: Response) => expect(res.body.status).toBe("success"))
        })
})
