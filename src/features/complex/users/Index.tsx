import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Pagination } from "@mui/material";

import { useAppSelector } from "../../../app/hooks";
import { selectLogin } from "../login/loginSlice";
// import { useNavigate } from "react-router-dom";

export default function Users(): JSX.Element {
  const [num, setNum] = React.useState(0);
  const [pageNum, setPageNum] = React.useState(0);
  const [users, setUsers] = React.useState([]);
  const [pages, setPages] = React.useState([]);

  const state = useAppSelector(selectLogin);
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const navigate = (str = ''): void => { console.log(str); };
  React.useEffect(() => {
    if (!state.isLogged) navigate('/');
  }, [state.isLogged]);

  React.useEffect(() => {

    async function getUsers(): Promise<void> {
      try {
        const rawRes = await fetch(`https://reqres.in/api/users?page=${pageNum}&per_page=${6}`, {headers: {'Accept': 'application/json'}, method: "GET"});
        const { data, total_pages:totalPages } = await rawRes.json();
        const nums: any = [];
        for (let i = 1; i < totalPages + 1; i++) nums.push(i);
        setPages(() => nums);
        setUsers(() => data);
      } catch (e) {
        alert(e);
      }
    }
    getUsers(); // eslint-disable-line @typescript-eslint/no-floating-promises 
    
  }, []);

  React.useEffect(() => {

    async function getUsers(): Promise<void> {
      try {
        const rawRes = await fetch(`https://reqres.in/api/users?page=${pageNum}&per_page=${6}`, {headers: {'Accept': 'application/json'}, method: "GET"});
        const { data, total_pages:totalPages } = await rawRes.json();
        const nums: any = [];
        for (let i = 1; i < totalPages + 1; i++) nums.push(i);
        setPages(() => nums);
        setUsers(() => data);
      } catch (e) {
        alert(e);
      }
    }
    if (num !== pageNum) {
      setNum(() => pageNum);
      getUsers(); // eslint-disable-line @typescript-eslint/no-floating-promises 
    }
  }, [users, setUsers, pageNum, setPageNum,]);

  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
          >
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
            <Typography>Pages: </Typography>
                  {
                    pages.map((page: number) => <Button onClick={() => { setPageNum(page); }} key={`${page} page`} variant="contained" color="secondary">{page}</Button>)
                  }
          <Grid container spacing={4}>
            {users.map((user: any) => (
              <Grid item key={user.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image={user.avatar}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.email}
                    </Typography>
                    <Typography>{user.first_name}</Typography>
                    <Typography>{user.last_name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      <Box sx={{ display: "flex" }}>
        <Pagination count={pages.length} variant="outlined" shape="rounded"  sx={{margin:'auto'}}/>
      </Box>
      </main>
      <Box sx={{ bgcolor: "primary.main", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
    </>
  );
}
