using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TimelyApi.Application.Core;
using TimelyApi.Data;
using TimelyApi.Models;

namespace TimelyApi.Application.TimeIntervals
{
    public class GetAll
    {
        public class Query : IRequest<Result<PagedList<TimeInterval>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<TimeInterval>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task<Result<PagedList<TimeInterval>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.TimeIntervals.OrderByDescending(x => x.TimeStart).AsQueryable();

                return Result<PagedList<TimeInterval>>.Success(await PagedList<TimeInterval>.CreateAsync(query,
                    request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}