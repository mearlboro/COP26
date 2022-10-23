import git

def Pull_Assets():
    repo = git.Repo('COP26')
    repo.remote().fetch()
    origin = repo.remote(name='origin')

    repo.git.add('assets/data/livegraph_150_cop27.js')
    repo.git.add('assets/data/livegraph_500_cop27.js')
    repo.git.add('assets/data/livegraph_1500_cop27.js')
    try:
        repo.git.add('assets/data/trends_data.js')
    except:
        print('Trend failed push')
    #try:
    #    repo.git.add('assets/data/livegraph_10000.js')
    #except:
    #    print('LG 10k failed')
    repo.git.commit('-m', 'Updated live files')
    origin.pull()
    origin.push()
